import * as React from 'react';

export const SimulationCanvas = ({ engineRef }) => {
  const canvasRef = React.useRef(null);
  const animFrameRef = React.useRef(null);
  const lastTimeRef = React.useRef(performance.now());

  const draw = React.useCallback((ctx, width, height) => {
    const engine = engineRef.current;
    if (!engine) return;

    const gs = engine.gridSize;
    const padding = 60;
    const cellW = gs > 1 ? (width - 2 * padding) / (gs - 1) : width - 2 * padding;
    const cellH = gs > 1 ? (height - 2 * padding) / (gs - 1) : height - 2 * padding;
    const roadWidth = Math.max(8, Math.min(cellW, cellH) * 0.12);

    // Clear
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid pattern
    ctx.strokeStyle = '#0a0a0e';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw roads
    for (let r = 0; r < gs; r++) {
      for (let c = 0; c < gs; c++) {
        const x = padding + c * cellW;
        const y = padding + r * cellH;

        // Vertical road segment
        if (r < gs - 1) {
          ctx.fillStyle = '#16161a';
          ctx.fillRect(x - roadWidth, y, roadWidth * 2, cellH);
          // Center lane marking
          ctx.strokeStyle = '#2a2a30';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 10]);
          ctx.beginPath();
          ctx.moveTo(x, y + 10);
          ctx.lineTo(x, y + cellH - 10);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Horizontal road segment
        if (c < gs - 1) {
          ctx.fillStyle = '#16161a';
          ctx.fillRect(x, y - roadWidth, cellW, roadWidth * 2);
          // Center lane marking
          ctx.strokeStyle = '#2a2a30';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 10]);
          ctx.beginPath();
          ctx.moveTo(x + 10, y);
          ctx.lineTo(x + cellW - 10, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // Draw intersections and traffic lights
    for (const int of engine.intersections) {
      const x = padding + int.col * cellW;
      const y = padding + int.row * cellH;
      const size = roadWidth * 2.2;

      if (int.blocked) {
        // Blocked intersection - accident
        ctx.fillStyle = '#2a0a0a';
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - size / 3, y - size / 3);
        ctx.lineTo(x + size / 3, y + size / 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + size / 3, y - size / 3);
        ctx.lineTo(x - size / 3, y + size / 3);
        ctx.stroke();
        // Pulsing warning
        const pulse = (Math.sin(engine.time * 3) + 1) * 0.3;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      } else {
        ctx.fillStyle = '#1a1a1f';
        ctx.fillRect(x - size / 2, y - size / 2, size, size);

        // Traffic lights
        const light = int.light;
        const lightR = Math.max(3, roadWidth * 0.35);
        const offset = size / 2 + lightR + 3;

        // NS direction lights
        const nsColor = light.inYellow ? '#eab308' : (light.phase === 'ns' ? '#22c55e' : '#ef4444');
        ctx.fillStyle = nsColor;
        ctx.beginPath(); ctx.arc(x, y - offset, lightR, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y + offset, lightR, 0, Math.PI * 2); ctx.fill();

        // EW direction lights
        const ewColor = light.inYellow ? '#eab308' : (light.phase === 'ew' ? '#22c55e' : '#ef4444');
        ctx.fillStyle = ewColor;
        ctx.beginPath(); ctx.arc(x - offset, y, lightR, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + offset, y, lightR, 0, Math.PI * 2); ctx.fill();

        // Light glow
        const glowNS = light.phase === 'ns' && !light.inYellow;
        const glowEW = light.phase === 'ew' && !light.inYellow;
        if (glowNS) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';
          ctx.fillRect(x - roadWidth, y - size, roadWidth * 2, size * 2);
        }
        if (glowEW) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.08)';
          ctx.fillRect(x - size, y - roadWidth, size * 2, roadWidth * 2);
        }
      }

      // Queue indicators
      if (int.queueNS > 0 || int.queueEW > 0) {
        ctx.font = `${Math.max(8, roadWidth * 0.6)}px JetBrains Mono, monospace`;
        ctx.fillStyle = '#a1a1aa66';
        if (int.queueNS > 0) {
          ctx.fillText(String(int.queueNS), x - roadWidth - 10, y - 2);
        }
        if (int.queueEW > 0) {
          ctx.fillText(String(int.queueEW), x + 2, y - roadWidth - 6);
        }
      }
    }

    const drawCar = (x, y, horizontal, color, width, height) => {
      const bodyW = horizontal ? width : height;
      const bodyH = horizontal ? height : width;
      const rx = x - bodyW / 2;
      const ry = y - bodyH / 2;
      const radius = Math.max(2, Math.min(bodyW, bodyH) * 0.24);

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(rx + radius, ry);
      ctx.lineTo(rx + bodyW - radius, ry);
      ctx.quadraticCurveTo(rx + bodyW, ry, rx + bodyW, ry + radius);
      ctx.lineTo(rx + bodyW, ry + bodyH - radius);
      ctx.quadraticCurveTo(rx + bodyW, ry + bodyH, rx + bodyW - radius, ry + bodyH);
      ctx.lineTo(rx + radius, ry + bodyH);
      ctx.quadraticCurveTo(rx, ry + bodyH, rx, ry + bodyH - radius);
      ctx.lineTo(rx, ry + radius);
      ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      if (horizontal) {
        ctx.fillRect(x - bodyW * 0.2, y - bodyH * 0.35, bodyW * 0.4, bodyH * 0.25);
      } else {
        ctx.fillRect(x - bodyW * 0.35, y - bodyH * 0.2, bodyW * 0.25, bodyH * 0.4);
      }
    };

    const drawBus = (x, y, horizontal, color, width, height) => {
      const bodyW = horizontal ? width : height;
      const bodyH = horizontal ? height : width;
      const rx = x - bodyW / 2;
      const ry = y - bodyH / 2;

      ctx.fillStyle = color;
      ctx.fillRect(rx, ry, bodyW, bodyH);

      ctx.fillStyle = '#111827';
      if (horizontal) {
        const windowW = bodyW / 6;
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(rx + 3 + i * (windowW + 1), ry + 1.5, windowW, Math.max(2, bodyH * 0.35));
        }
      } else {
        const windowH = bodyH / 6;
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(rx + 1.5, ry + 3 + i * (windowH + 1), Math.max(2, bodyW * 0.35), windowH);
        }
      }

      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(rx + 0.5, ry + 0.5, bodyW - 1, bodyH - 1);
    };

    const drawAmbulance = (x, y, horizontal, color, width, height, time) => {
      const bodyW = horizontal ? width : height;
      const bodyH = horizontal ? height : width;
      const rx = x - bodyW / 2;
      const ry = y - bodyH / 2;

      ctx.save();
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fillStyle = color;
      ctx.fillRect(rx, ry, bodyW, bodyH);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      const crossSize = Math.max(2, Math.min(bodyW, bodyH) * 0.45);
      if (horizontal) {
        ctx.fillRect(x - crossSize * 0.5, y - 1, crossSize, 2);
        ctx.fillRect(x - 1, y - crossSize * 0.5, 2, crossSize);
      } else {
        ctx.fillRect(x - crossSize * 0.5, y - 1, crossSize, 2);
        ctx.fillRect(x - 1, y - crossSize * 0.5, 2, crossSize);
      }

      const flash = Math.sin(time * 12) > 0;
      ctx.fillStyle = flash ? '#ffffff' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw vehicles
    for (const vehicle of engine.vehicles) {
      const current = vehicle.route[vehicle.routeIndex];
      const next = vehicle.route[vehicle.routeIndex + 1];
      if (!current) continue;

      let vx, vy;
      let isHorizontal = false;

      if (next && !vehicle.waiting) {
        // Moving
        const cx = padding + current.col * cellW;
        const cy = padding + current.row * cellH;
        const nx = padding + next.col * cellW;
        const ny = padding + next.row * cellH;
        vx = cx + (nx - cx) * vehicle.progress;
        vy = cy + (ny - cy) * vehicle.progress;

        const dCol = next.col - current.col;
        const dRow = next.row - current.row;
        isHorizontal = dCol !== 0;

        // Lane offset
        if (dRow > 0) vx += roadWidth * 0.4;
        else if (dRow < 0) vx -= roadWidth * 0.4;
        if (dCol > 0) vy -= roadWidth * 0.4;
        else if (dCol < 0) vy += roadWidth * 0.4;
      } else if (next) {
        // Waiting
        vx = padding + current.col * cellW;
        vy = padding + current.row * cellH;
        const dRow = next.row - current.row;
        const dCol = next.col - current.col;
        isHorizontal = dCol !== 0;
        const waitOffset = Math.min(vehicle.waitTime * 6, roadWidth * 2.5);

        if (dRow > 0) { vy -= roadWidth * 1.2 - waitOffset * 0.2; vx += roadWidth * 0.4; }
        else if (dRow < 0) { vy += roadWidth * 1.2 - waitOffset * 0.2; vx -= roadWidth * 0.4; }
        else if (dCol > 0) { vx -= roadWidth * 1.2 - waitOffset * 0.2; vy -= roadWidth * 0.4; }
        else if (dCol < 0) { vx += roadWidth * 1.2 - waitOffset * 0.2; vy += roadWidth * 0.4; }
      } else {
        vx = padding + current.col * cellW;
        vy = padding + current.row * cellH;
      }

      const w = vehicle.width;
      const h = vehicle.height;

      if (vehicle.type === 'ambulance') {
        drawAmbulance(vx, vy, isHorizontal, vehicle.color, w, h, engine.time);
      } else if (vehicle.type === 'bus') {
        drawBus(vx, vy, isHorizontal, vehicle.color, w, h);
      } else {
        drawCar(vx, vy, isHorizontal, vehicle.color, w, h);
      }
    }

    // Draw decorative pedestrians
    const pedCount = Math.min(engine.gridSize * 3, 20);
    for (let i = 0; i < pedCount; i++) {
      const seed = i * 137.5 + 42;
      const row = Math.floor(seed % engine.gridSize);
      const col = Math.floor((seed * 2.3) % engine.gridSize);
      const phase = (engine.time * 0.4 + seed * 0.1) % 6;
      const baseX = padding + col * cellW;
      const baseY = padding + row * cellH;
      const walkRange = roadWidth * 2;

      if (phase < 3) {
        const offset = (phase / 3) * walkRange - walkRange / 2;
        ctx.fillStyle = 'rgba(212, 212, 216, 0.4)';
        ctx.beginPath();
        if (i % 2 === 0) {
          ctx.arc(baseX + offset, baseY + roadWidth * 1.8, 2, 0, Math.PI * 2);
        } else {
          ctx.arc(baseX + roadWidth * 1.8, baseY + offset, 2, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    }

    // HUD info
    ctx.fillStyle = '#71717a';
    ctx.font = '11px JetBrains Mono, monospace';
    const mins = Math.floor(engine.time / 60);
    const secs = Math.floor(engine.time % 60);
    ctx.fillText(
      `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
      padding - 45, padding - 20
    );
    ctx.fillText(`${engine.vehicles.length} veic.`, padding - 45, padding - 6);

    // Mode indicator
    const modeText = engine.mode === 'ai'
      ? 'IA OTIMIZADA'
      : engine.mode === 'rl'
        ? 'RL Q-LEARNING'
        : 'CICLO FIXO';
    const modeColor = engine.mode === 'ai' ? '#3b82f6' : engine.mode === 'rl' ? '#10b981' : '#71717a';
    ctx.fillStyle = modeColor;
    ctx.font = 'bold 10px Manrope, sans-serif';
    ctx.fillText(modeText, width - padding - 80, padding - 20);

    // Speed indicator
    if (engine.speed > 1) {
      ctx.fillStyle = '#eab308';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`${engine.speed}x`, width - padding - 20, padding - 6);
    }

    if (!engine.running) {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.5)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#fafafa';
      ctx.font = 'bold 18px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSADO', width / 2, height / 2);
      ctx.font = '12px Manrope, sans-serif';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('Clique em Iniciar para continuar', width / 2, height / 2 + 25);
      ctx.textAlign = 'left';
    }

  }, [engineRef]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const gameLoop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const engine = engineRef.current;
      if (engine) {
        engine.tick(dt);
      }

      const rect = container.getBoundingClientRect();
      draw(ctx, rect.width, rect.height);
      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [engineRef, draw]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="simulation-canvas"
      className="w-full h-full block"
    />
  );
};