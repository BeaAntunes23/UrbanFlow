from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import json
import uuid


async def translate_rule_text(text: str) -> dict:
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        raise ValueError("EMERGENT_LLM_KEY not configured")

    chat = LlmChat(
        api_key=api_key,
        session_id=f"rule-{uuid.uuid4()}",
        system_message="""You are a traffic rule translator. Convert natural language traffic rules (in Portuguese) into structured JSON.
Output ONLY valid JSON with this schema:
{
  "type": "priority" | "timing" | "block" | "density",
  "target": "ambulance" | "bus" | "car" | "pedestrian" | "all",
  "conditions": {
    "time_start": null,
    "time_end": null,
    "scenario": null,
    "location": "all"
  },
  "action": {
    "green_priority": false,
    "extend_green_seconds": null,
    "block_intersection": false,
    "reduce_wait_factor": null
  },
  "description_pt": "Portuguese description of what this rule does"
}

Return ONLY the JSON object. No markdown formatting, no extra text.""" 
    )

    message = UserMessage(text=text)
    response = await chat.send_message(message)

    response_text = response.strip()
    if response_text.startswith('```'):
        lines = response_text.split('\n')
        response_text = '\n'.join(lines[1:-1])
    if response_text.endswith('```'):
        response_text = response_text[:-3].strip()

    return json.loads(response_text)