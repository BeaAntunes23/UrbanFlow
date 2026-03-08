from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import io
import csv

from rule_engine import translate_rule_text


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class RuleTranslateRequest(BaseModel):
    text: str = Field(min_length=1)


class RuleTranslateResponse(BaseModel):
    ok: bool
    rule: Optional[dict] = None
    error: Optional[str] = None


class MetricSnapshot(BaseModel):
    scenario: str
    mode: str
    grid_size: int
    duration: float
    avg_wait_time: float
    flow_rate: float
    co2_emissions: float
    emergency_response_time: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class MetricsSaveRequest(BaseModel):
    scenario: str
    mode: str
    grid_size: int
    duration: float
    avg_wait_time: float
    flow_rate: float
    co2_emissions: float
    emergency_response_time: float


class MetricsExportRequest(BaseModel):
    snapshots: List[MetricSnapshot]


class Campaign(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    campaign_id: str
    scenario: str
    mode: str
    repetitions: int
    grid_size: int
    duration: float
    seed: Optional[int] = None
    pairs: Optional[List[dict]] = None  # For paired analysis
    results_summary: Optional[dict] = None  # Aggregated results
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CampaignSaveRequest(BaseModel):
    campaign_id: str
    scenario: str
    mode: str
    repetitions: int
    grid_size: int
    duration: float
    seed: Optional[int] = None
    pairs: Optional[List[dict]] = None
    results_summary: Optional[dict] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/rules/translate", response_model=RuleTranslateResponse)
async def rules_translate(payload: RuleTranslateRequest):
    try:
        rule = await translate_rule_text(payload.text)
        return RuleTranslateResponse(ok=True, rule=rule)
    except Exception as exc:
        logger.exception("Erro ao traduzir regra")
        return RuleTranslateResponse(ok=False, error=str(exc))


@api_router.post("/metrics/save")
async def metrics_save(payload: MetricsSaveRequest):
    document = payload.model_dump()
    document["id"] = str(uuid.uuid4())
    document["timestamp"] = datetime.now(timezone.utc).isoformat()
    await db.metrics_snapshots.insert_one(document)
    return {"ok": True, "id": document["id"]}


@api_router.post("/metrics/export")
async def metrics_export(payload: MetricsExportRequest):
    output = io.StringIO()
    writer = csv.DictWriter(
        output,
        fieldnames=[
            "timestamp",
            "scenario",
            "mode",
            "grid_size",
            "duration",
            "avg_wait_time",
            "flow_rate",
            "co2_emissions",
            "emergency_response_time",
        ],
    )
    writer.writeheader()

    for snapshot in payload.snapshots:
        row = snapshot.model_dump()
        if isinstance(row.get("timestamp"), datetime):
            row["timestamp"] = row["timestamp"].isoformat()
        writer.writerow(row)

    csv_bytes = io.BytesIO(output.getvalue().encode("utf-8"))
    headers = {
        "Content-Disposition": 'attachment; filename="urbanflow_metricas.csv"'
    }
    return StreamingResponse(csv_bytes, media_type="text/csv", headers=headers)


@api_router.post("/campaigns/save", response_model=Campaign)
async def campaigns_save(payload: CampaignSaveRequest):
    campaign_dict = payload.model_dump()
    campaign_obj = Campaign(**campaign_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = campaign_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.campaigns.insert_one(doc)
    return campaign_obj


@api_router.get("/campaigns", response_model=List[Campaign])
async def get_campaigns(limit: int = 100):
    # Exclude MongoDB's _id field from the query results
    campaigns = await db.campaigns.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit).to_list(limit)
    
    # Convert ISO string timestamps back to datetime objects
    for campaign in campaigns:
        if isinstance(campaign.get('timestamp'), str):
            campaign['timestamp'] = datetime.fromisoformat(campaign['timestamp'])
    
    return campaigns


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

