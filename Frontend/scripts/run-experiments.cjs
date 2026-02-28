const fs = require('fs');
const path = require('path');
const Module = require('module');

const FRONTEND_ROOT = path.resolve(__dirname, '..');
const ENGINE_PATH = path.resolve(FRONTEND_ROOT, 'src', 'componentes', 'simulation', 'engine.js');
const RESULTS_DIR = path.resolve(FRONTEND_ROOT, 'experiments', 'results');

const DEFAULTS = {
  repetitions: 30,
  duration: 300,
  dt: 0.2,
  speed: 1,
  gridSize: 6,
};

const SCENARIOS = ['normal', 'rush_hour', 'accident', 'emergency'];
const MODES = ['traditional', 'ai'];

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === '--repetitions' && next) {
      args.repetitions = Number(next);
      i += 1;
    } else if (token === '--duration' && next) {
      args.duration = Number(next);
      i += 1;
    } else if (token === '--dt' && next) {
      args.dt = Number(next);
      i += 1;
    } else if (token === '--speed' && next) {
      args.speed = Number(next);
      i += 1;
    } else if (token === '--grid' && next) {
      args.gridSize = Number(next);
      i += 1;
    }
  }
  return args;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function random() {
    t += 0x6D2B79F5;
    let value = Math.imul(t ^ (t >>> 15), 1 | t);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function loadSimulationEngine() {
  const source = fs.readFileSync(ENGINE_PATH, 'utf8');
  const transformed = `${source.replace('export class SimulationEngine', 'class SimulationEngine')}\nmodule.exports = { SimulationEngine };\n`;
  const localModule = new Module(ENGINE_PATH, module);
  localModule.filename = ENGINE_PATH;
  localModule.paths = Module._nodeModulePaths(path.dirname(ENGINE_PATH));
  localModule._compile(transformed, ENGINE_PATH);
  return localModule.exports.SimulationEngine;
}

function toCsv(rows, columns) {
  const lines = [columns.join(',')];
  for (const row of rows) {
    const line = columns
      .map((column) => {
        const value = row[column] ?? '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(',');
    lines.push(line);
  }
  return lines.join('\n');
}

function runSingleExperiment(SimulationEngine, params) {
  const { scenario, mode, duration, dt, speed, gridSize, seed } = params;
  const random = mulberry32(seed);
  const originalRandom = Math.random;
  Math.random = random;

  try {
    const engine = new SimulationEngine(gridSize);
    engine.setScenario(scenario);
    engine.setMode(mode);
    engine.setSpeed(speed);
    engine.start();

    const steps = Math.floor(duration / dt);
    for (let i = 0; i < steps; i++) {
      engine.tick(dt);
    }

    const metrics = engine.getMetrics();
    return {
      timestamp: new Date().toISOString(),
      scenario,
      mode,
      seed,
      repetitions_duration_seconds: duration,
      dt,
      speed,
      grid_size: gridSize,
      avg_wait_time: metrics.avgWaitTime,
      flow_rate: metrics.flowRate,
      co2_emissions: metrics.co2Emissions,
      emergency_response_time: metrics.emergencyResponseTime,
      vehicles_active: metrics.vehiclesActive,
      vehicles_completed: metrics.vehiclesCompleted,
      simulation_time: metrics.simulationTime,
    };
  } finally {
    Math.random = originalRandom;
  }
}

function runCampaign(config) {
  const SimulationEngine = loadSimulationEngine();
  const rows = [];
  let seedBase = 20260228;

  for (const scenario of SCENARIOS) {
    for (const mode of MODES) {
      for (let repetition = 1; repetition <= config.repetitions; repetition++) {
        seedBase += 17;
        const seed = seedBase + repetition;
        const result = runSingleExperiment(SimulationEngine, {
          scenario,
          mode,
          duration: config.duration,
          dt: config.dt,
          speed: config.speed,
          gridSize: config.gridSize,
          seed,
        });
        rows.push(result);
      }
    }
  }

  return rows;
}

function ensureDirectories() {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

function writeOutputs(rows, config) {
  ensureDirectories();

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const csvFile = path.resolve(RESULTS_DIR, `campaign_${stamp}.csv`);
  const jsonFile = path.resolve(RESULTS_DIR, `campaign_${stamp}.json`);
  const latestCsv = path.resolve(RESULTS_DIR, 'latest.csv');
  const latestJson = path.resolve(RESULTS_DIR, 'latest.json');

  const columns = [
    'timestamp',
    'scenario',
    'mode',
    'seed',
    'repetitions_duration_seconds',
    'dt',
    'speed',
    'grid_size',
    'avg_wait_time',
    'flow_rate',
    'co2_emissions',
    'emergency_response_time',
    'vehicles_active',
    'vehicles_completed',
    'simulation_time',
  ];

  const csvText = toCsv(rows, columns);
  const payload = {
    generated_at: new Date().toISOString(),
    config,
    scenarios: SCENARIOS,
    modes: MODES,
    rows,
  };

  fs.writeFileSync(csvFile, csvText, 'utf8');
  fs.writeFileSync(jsonFile, JSON.stringify(payload, null, 2), 'utf8');
  fs.writeFileSync(latestCsv, csvText, 'utf8');
  fs.writeFileSync(latestJson, JSON.stringify(payload, null, 2), 'utf8');

  return { csvFile, jsonFile, latestCsv, latestJson };
}

function main() {
  const config = parseArgs(process.argv.slice(2));
  if (config.repetitions <= 0 || config.duration <= 0 || config.dt <= 0 || config.gridSize < 2) {
    throw new Error('Parâmetros inválidos. Verifica --repetitions, --duration, --dt e --grid.');
  }

  console.log('[experiment] Configuração:', config);
  const rows = runCampaign(config);
  const files = writeOutputs(rows, config);

  console.log(`[experiment] Corridas executadas: ${rows.length}`);
  console.log(`[experiment] CSV: ${files.csvFile}`);
  console.log(`[experiment] JSON: ${files.jsonFile}`);
  console.log(`[experiment] latest.csv: ${files.latestCsv}`);
}

main();
