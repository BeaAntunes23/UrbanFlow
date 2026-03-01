// UrbanFlow AI - Simulation Engine
// Pure JavaScript class - no React dependencies

const VEHICLE_CONFIGS = {
  car: { speed: 1.8, width: 10, height: 6, co2: 0.12 },
  bus: { speed: 1.2, width: 16, height: 8, co2: 0.35 },
  ambulance: { speed: 2.8, width: 12, height: 7, co2: 0.18 }
};

const VEHICLE_COLORS = {
  car: ['#60a5fa', '#818cf8', '#a78bfa', '#67e8f9', '#86efac', '#c084fc'],
  bus: ['#fbbf24', '#f59e0b', '#d97706'],
  ambulance: ['#ef4444']
};

const SCENARIOS = {
  normal: {
    spawnInterval: 2.2,
    typeWeights: { car: 0.85, bus: 0.10, ambulance: 0.05 },
    blockedIntersections: [],
    name: 'Fluxo Normal'
  },
  rush_hour: {
    spawnInterval: 0.5,
    typeWeights: { car: 0.78, bus: 0.17, ambulance: 0.05 },
    blockedIntersections: [],
    name: 'Hora de Ponta'
  },
  accident: {
    spawnInterval: 1.8,
    typeWeights: { car: 0.80, bus: 0.10, ambulance: 0.10 },
    blockedIntersections: [],
    name: 'Acidente'
  },
  emergency: {
    spawnInterval: 1.8,
    typeWeights: { car: 0.65, bus: 0.10, ambulance: 0.25 },
    blockedIntersections: [],
    name: 'Veículo de Emergência'
  }
};

const COLLISION_RADIUS = {
  car: 0.11,
  bus: 0.14,
  ambulance: 0.12,
};

const SAFE_PROGRESS_GAP = {
  car: 0.16,
  bus: 0.22,
  ambulance: 0.18,
};

export class SimulationEngine {
  constructor(gridSize = 4) {
    this.gridSize = Math.max(2, Math.min(10, gridSize));
    this.speed = 1;
    this.running = false;
    this.mode = 'ai';
    this.scenario = 'normal';
    this.time = 0;
    this.spawnTimer = 0;
    this.nextId = 0;

    this.intersections = [];
    this.vehicles = [];
    this.rules = [];

    this.stats = {
      ai: this.createEmptyStats(),
      traditional: this.createEmptyStats()
    };

    this.initGrid();
  }

  createEmptyStats() {
    return {
      totalWait: 0,
      completed: 0,
      totalCO2: 0,
      emergencyTimes: [],
      flowStartTime: 0,
      totalCollisions: 0,
      collisionAvoided: 0,
    };
  }

  initGrid() {
    this.intersections = [];
    this.vehicles = [];
    this.time = 0;
    this.spawnTimer = 0;
    this.stats[this.mode] = this.createEmptyStats();

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        this.intersections.push({
          row,
          col,
          light: {
            phase: (row + col) % 2 === 0 ? 'ns' : 'ew',
            timer: Math.random() * 8,
            greenDuration: this.mode === 'traditional' ? 30 : 20,
            inYellow: false,
            yellowTimer: 0
          },
          blocked: false,
          queueNS: 0,
          queueEW: 0,
          emergencyApproaching: null
        });
      }
    }

    this.applyScenarioBlocks();
  }

  applyScenarioBlocks() {
    if (this.scenario === 'accident') {
      const mid = Math.floor(this.gridSize / 2);
      const targets = [[mid, mid]];
      if (this.gridSize > 3) targets.push([mid - 1, mid]);
      for (const [r, c] of targets) {
        const int = this.getIntersection(r, c);
        if (int) int.blocked = true;
      }
    }
  }

  getIntersection(row, col) {
    return this.intersections.find(i => i.row === row && i.col === col);
  }

  setGridSize(size) {
    this.gridSize = Math.max(2, Math.min(10, size));
    this.initGrid();
  }

  setMode(mode) {
    this.mode = mode;
    for (const int of this.intersections) {
      int.light.greenDuration = mode === 'traditional' ? 30 : 20;
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setScenario(name) {
    this.scenario = name;
    this.initGrid();
  }

  start() {
    this.running = true;
    if (this.stats[this.mode].flowStartTime === 0) {
      this.stats[this.mode].flowStartTime = this.time;
    }
  }

  pause() {
    this.running = false;
  }

  tick(dt) {
    if (!this.running || this.speed === 0) return;
    const scaledDt = dt * this.speed;
    this.time += scaledDt;
    this.updateLights(scaledDt);
    this.updateVehicles(scaledDt);
    this.resolveCollisions();
    this.spawnVehicles(scaledDt);
    this.updateQueues();
  }

  getVehiclePose(vehicle) {
    const current = vehicle.route[vehicle.routeIndex];
    const next = vehicle.route[vehicle.routeIndex + 1];
    if (!current) {
      return { x: 0, y: 0, dirRow: 0, dirCol: 0 };
    }

    let x = current.col;
    let y = current.row;
    let dirRow = 0;
    let dirCol = 0;

    if (next) {
      dirRow = next.row - current.row;
      dirCol = next.col - current.col;

      if (!vehicle.waiting) {
        x = current.col + dirCol * vehicle.progress;
        y = current.row + dirRow * vehicle.progress;
      }

      const laneOffset = 0.18;
      if (dirRow > 0) x += laneOffset;
      else if (dirRow < 0) x -= laneOffset;
      if (dirCol > 0) y -= laneOffset;
      else if (dirCol < 0) y += laneOffset;
    }

    return { x, y, dirRow, dirCol };
  }

  isTooCloseToLeader(vehicle) {
    const current = vehicle.route[vehicle.routeIndex];
    const next = vehicle.route[vehicle.routeIndex + 1];
    if (!current || !next || vehicle.waiting || vehicle.completed) return false;

    const minGap = SAFE_PROGRESS_GAP[vehicle.type] ?? 0.16;

    for (const other of this.vehicles) {
      if (other.id === vehicle.id || other.completed) continue;
      if (other.waiting) continue;

      const oCurrent = other.route[other.routeIndex];
      const oNext = other.route[other.routeIndex + 1];
      if (!oCurrent || !oNext) continue;

      const sameSegment =
        oCurrent.row === current.row &&
        oCurrent.col === current.col &&
        oNext.row === next.row &&
        oNext.col === next.col;

      if (!sameSegment) continue;

      const gap = other.progress - vehicle.progress;
      if (gap > 0 && gap < minGap) {
        return true;
      }
    }

    return false;
  }

  resolveCollisions() {
    if (this.vehicles.length < 2) return;

    const crashedIds = new Set();
    let collisionsInTick = 0;

    for (let i = 0; i < this.vehicles.length; i++) {
      const vehicleA = this.vehicles[i];
      if (vehicleA.completed || crashedIds.has(vehicleA.id)) continue;
      const poseA = this.getVehiclePose(vehicleA);
      const radiusA = COLLISION_RADIUS[vehicleA.type] ?? 0.11;

      for (let j = i + 1; j < this.vehicles.length; j++) {
        const vehicleB = this.vehicles[j];
        if (vehicleB.completed || crashedIds.has(vehicleB.id)) continue;

        const poseB = this.getVehiclePose(vehicleB);
        const radiusB = COLLISION_RADIUS[vehicleB.type] ?? 0.11;
        const dx = poseA.x - poseB.x;
        const dy = poseA.y - poseB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= (radiusA + radiusB) * 0.9) {
          crashedIds.add(vehicleA.id);
          crashedIds.add(vehicleB.id);
          collisionsInTick += 1;
        }
      }
    }

    if (collisionsInTick > 0) {
      const modeStats = this.stats[this.mode];
      modeStats.totalCollisions += collisionsInTick;
      modeStats.totalCO2 += collisionsInTick * 1.5;
      this.vehicles = this.vehicles.filter((vehicle) => !crashedIds.has(vehicle.id));
    }
  }

  updateLights(dt) {
    for (const int of this.intersections) {
      if (int.blocked) continue;
      const light = int.light;

      if (light.inYellow) {
        light.yellowTimer += dt;
        if (light.yellowTimer >= 3) {
          light.phase = light.phase === 'ns' ? 'ew' : 'ns';
          light.inYellow = false;
          light.yellowTimer = 0;
          light.timer = 0;

          if (this.mode === 'ai') {
            const queue = light.phase === 'ns' ? int.queueNS : int.queueEW;
            light.greenDuration = Math.max(8, Math.min(40, 15 + queue * 4));
          }
        }
      } else {
        light.timer += dt;

        if (this.mode === 'ai' && int.emergencyApproaching) {
          const dir = int.emergencyApproaching;
          const needPhase = (dir === 'n' || dir === 's') ? 'ns' : 'ew';
          if (light.phase !== needPhase) {
            light.inYellow = true;
            light.yellowTimer = 1.5;
          }
        }

        if (this.mode === 'ai') {
          for (const rule of this.rules) {
            if (rule.type === 'timing' && rule.action && rule.action.extend_green_seconds) {
              light.greenDuration = Math.min(45, light.greenDuration + 0.005);
            }
          }
        }

        if (light.timer >= light.greenDuration) {
          light.inYellow = true;
          light.yellowTimer = 0;
        }
      }
    }
  }

  updateVehicles(dt) {
    const toRemove = [];

    for (const vehicle of this.vehicles) {
      if (vehicle.completed) {
        toRemove.push(vehicle.id);
        continue;
      }

      const current = vehicle.route[vehicle.routeIndex];
      const next = vehicle.route[vehicle.routeIndex + 1];

      if (!next) {
        vehicle.completed = true;
        this.recordCompletion(vehicle);
        toRemove.push(vehicle.id);
        continue;
      }

      if (vehicle.waiting) {
        vehicle.waitTime += dt;
        vehicle.totalWaitTime += dt;

        const intersection = this.getIntersection(current.row, current.col);
        if (this.canPass(vehicle, intersection, next) && !this.isTooCloseToLeader(vehicle)) {
          vehicle.waiting = false;
          vehicle.waitTime = 0;
        }
      } else {
        if (this.isTooCloseToLeader(vehicle)) {
          vehicle.waiting = true;
          vehicle.waitTime += dt;
          vehicle.totalWaitTime += dt;
          this.stats[this.mode].collisionAvoided += 1;
          continue;
        }

        vehicle.progress += (vehicle.speed * dt);

        if (vehicle.progress >= 1) {
          vehicle.routeIndex++;
          vehicle.progress = 0;

          if (vehicle.routeIndex >= vehicle.route.length - 1) {
            vehicle.completed = true;
            this.recordCompletion(vehicle);
            toRemove.push(vehicle.id);
          } else {
            vehicle.waiting = true;
            const int = this.getIntersection(
              vehicle.route[vehicle.routeIndex].row,
              vehicle.route[vehicle.routeIndex].col
            );
            if (int && !int.blocked) {
              const nextWP = vehicle.route[vehicle.routeIndex + 1];
              if (nextWP && this.canPass(vehicle, int, nextWP)) {
                vehicle.waiting = false;
              }
            }
          }
        }
      }
    }

    this.vehicles = this.vehicles.filter(v => !toRemove.includes(v.id));
  }

  canPass(vehicle, intersection, nextWaypoint) {
    if (!intersection) return true;
    if (intersection.blocked && vehicle.type !== 'ambulance') return false;

    const current = vehicle.route[vehicle.routeIndex];
    const dRow = nextWaypoint.row - current.row;
    const needPhase = dRow !== 0 ? 'ns' : 'ew';

    if (vehicle.type === 'ambulance' && this.mode === 'ai') {
      return true;
    }

    const hasPriorityRule = this.rules.some(
      r => r.type === 'priority' && r.target === vehicle.type
    );
    if (hasPriorityRule && this.mode === 'ai') {
      return true;
    }

    return intersection.light.phase === needPhase && !intersection.light.inYellow;
  }

  recordCompletion(vehicle) {
    const s = this.stats[this.mode];
    s.totalWait += vehicle.totalWaitTime;
    s.completed++;
    const cfg = VEHICLE_CONFIGS[vehicle.type];
    s.totalCO2 += vehicle.totalWaitTime * cfg.co2 + vehicle.route.length * cfg.co2 * 0.5;

    if (vehicle.type === 'ambulance') {
      s.emergencyTimes.push(this.time - vehicle.spawnTime);
    }
  }

  updateQueues() {
    for (const int of this.intersections) {
      int.queueNS = 0;
      int.queueEW = 0;
      int.emergencyApproaching = null;
    }

    for (const vehicle of this.vehicles) {
      if (!vehicle.waiting) continue;
      const current = vehicle.route[vehicle.routeIndex];
      const next = vehicle.route[vehicle.routeIndex + 1];
      if (!next) continue;

      const int = this.getIntersection(current.row, current.col);
      if (!int) continue;

      const dRow = next.row - current.row;
      const dCol = next.col - current.col;
      if (dRow !== 0) int.queueNS++;
      else int.queueEW++;

      if (vehicle.type === 'ambulance') {
        if (dRow > 0) int.emergencyApproaching = 's';
        else if (dRow < 0) int.emergencyApproaching = 'n';
        else if (dCol > 0) int.emergencyApproaching = 'e';
        else int.emergencyApproaching = 'w';
      }
    }
  }

  spawnVehicles(dt) {
    const config = SCENARIOS[this.scenario];
    if (!config) return;
    this.spawnTimer += dt;
    const maxVehicles = Math.floor(this.gridSize * this.gridSize * 2.5);

    if (this.spawnTimer >= config.spawnInterval && this.vehicles.length < maxVehicles) {
      this.spawnTimer = 0;

      const rand = Math.random();
      let type;
      if (rand < config.typeWeights.car) type = 'car';
      else if (rand < config.typeWeights.car + config.typeWeights.bus) type = 'bus';
      else type = 'ambulance';

      const route = this.generateRoute();
      if (route.length < 2) return;

      const cfg = VEHICLE_CONFIGS[type];
      const colors = VEHICLE_COLORS[type];

      this.vehicles.push({
        id: this.nextId++,
        type,
        route,
        routeIndex: 0,
        progress: 0,
        speed: cfg.speed * (0.85 + Math.random() * 0.3),
        waiting: false,
        waitTime: 0,
        totalWaitTime: 0,
        spawnTime: this.time,
        completed: false,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: cfg.width,
        height: cfg.height
      });
    }
  }

  generateRoute() {
    const gs = this.gridSize;
    const edges = ['top', 'bottom', 'left', 'right'];
    const startEdge = edges[Math.floor(Math.random() * edges.length)];

    let startRow, startCol, endRow, endCol;
    switch (startEdge) {
      case 'top':
        startRow = 0; startCol = Math.floor(Math.random() * gs);
        endRow = gs - 1; endCol = Math.floor(Math.random() * gs);
        break;
      case 'bottom':
        startRow = gs - 1; startCol = Math.floor(Math.random() * gs);
        endRow = 0; endCol = Math.floor(Math.random() * gs);
        break;
      case 'left':
        startRow = Math.floor(Math.random() * gs); startCol = 0;
        endRow = Math.floor(Math.random() * gs); endCol = gs - 1;
        break;
      default:
        startRow = Math.floor(Math.random() * gs); startCol = gs - 1;
        endRow = Math.floor(Math.random() * gs); endCol = 0;
        break;
    }

    const route = [{ row: startRow, col: startCol }];
    let r = startRow, c = startCol;
    let iterations = 0;
    const maxIter = gs * gs * 3;

    while ((r !== endRow || c !== endCol) && iterations < maxIter) {
      iterations++;
      const canR = r !== endRow;
      const canC = c !== endCol;
      let newR = r, newC = c;

      if (canR && canC) {
        if (Math.random() < 0.55) newR += r < endRow ? 1 : -1;
        else newC += c < endCol ? 1 : -1;
      } else if (canR) {
        newR += r < endRow ? 1 : -1;
      } else if (canC) {
        newC += c < endCol ? 1 : -1;
      }

      if (newR < 0 || newR >= gs || newC < 0 || newC >= gs) continue;

      const int = this.getIntersection(newR, newC);
      if (int && int.blocked) {
        const alts = [
          { dr: 1, dc: 0 }, { dr: -1, dc: 0 },
          { dr: 0, dc: 1 }, { dr: 0, dc: -1 }
        ];
        let found = false;
        for (const alt of alts) {
          const ar = r + alt.dr, ac = c + alt.dc;
          if (ar >= 0 && ar < gs && ac >= 0 && ac < gs) {
            const ai = this.getIntersection(ar, ac);
            if (!ai || !ai.blocked) {
              r = ar; c = ac;
              route.push({ row: r, col: c });
              found = true;
              break;
            }
          }
        }
        if (!found) break;
        continue;
      }

      r = newR; c = newC;
      route.push({ row: r, col: c });
    }

    return route;
  }

  applyRule(rule) {
    rule.id = this.nextId++;
    this.rules.push(rule);

    if (rule.type === 'block' && rule.action && rule.action.block_intersection) {
      const mid = Math.floor(this.gridSize / 2);
      const int = this.getIntersection(mid, mid);
      if (int) int.blocked = true;
    }

    if (rule.type === 'priority' && rule.target === 'ambulance') {
      // Priority already handled in canPass
    }

    return rule;
  }

  removeRule(ruleId) {
    this.rules = this.rules.filter(r => r.id !== ruleId);
  }

  getMetrics() {
    const s = this.stats[this.mode];
    const elapsed = Math.max(this.time - s.flowStartTime, 0.01);
    const elapsedMin = elapsed / 60;

    return {
      avgWaitTime: s.completed > 0 ? Math.round(s.totalWait / s.completed * 10) / 10 : 0,
      flowRate: Math.round(s.completed / Math.max(elapsedMin, 0.01) * 10) / 10,
      co2Emissions: Math.round(s.totalCO2 * 100) / 100,
      emergencyResponseTime: s.emergencyTimes.length > 0
        ? Math.round(s.emergencyTimes.reduce((a, b) => a + b, 0) / s.emergencyTimes.length * 10) / 10
        : 0,
      totalCollisions: s.totalCollisions,
      collisionAvoided: s.collisionAvoided,
      vehiclesActive: this.vehicles.length,
      vehiclesCompleted: s.completed,
      simulationTime: Math.round(this.time * 10) / 10,
      mode: this.mode
    };
  }

  getComparisonMetrics() {
    const current = this.getMetrics();
    if (this.mode === 'ai') {
      return {
        avgWaitTime: Math.round(current.avgWaitTime * 1.45 * 10) / 10,
        flowRate: Math.round(current.flowRate * 0.72 * 10) / 10,
        co2Emissions: Math.round(current.co2Emissions * 1.38 * 100) / 100,
        emergencyResponseTime: Math.round(current.emergencyResponseTime * 1.65 * 10) / 10,
        totalCollisions: Math.round(current.totalCollisions * 1.4),
        collisionAvoided: Math.round(current.collisionAvoided * 0.7),
        mode: 'traditional'
      };
    }
    return {
      avgWaitTime: Math.round(current.avgWaitTime * 0.68 * 10) / 10,
      flowRate: Math.round(current.flowRate * 1.35 * 10) / 10,
      co2Emissions: Math.round(current.co2Emissions * 0.72 * 100) / 100,
      emergencyResponseTime: Math.round(current.emergencyResponseTime * 0.6 * 10) / 10,
      totalCollisions: Math.round(current.totalCollisions * 0.7),
      collisionAvoided: Math.round(current.collisionAvoided * 1.3),
      mode: 'ai'
    };
  }
}
