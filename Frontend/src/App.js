import * as React from "react";
import "@/App.css";
import { Toaster } from "sonner";
import { SimulationEngine } from "@/componentes/simulation/engine";
import { SimulationCanvas } from "@/componentes/simulation/SimulationCanvas";
import { ControlPanel } from "@/componentes/dashboard/ControlPanel";
import { MetricsWidget } from "@/componentes/dashboard/MetricWidget";

const INITIAL_CONFIG = {
  scenario: "normal",
  mode: "ai",
  speed: 1,
  gridSize: 4,
  running: true,
};

const INITIAL_METRICS = {
  avgWaitTime: 0,
  flowRate: 0,
  co2Emissions: 0,
  emergencyResponseTime: 0,
  totalCollisions: 0,
  collisionAvoided: 0,
  vehiclesActive: 0,
  vehiclesCompleted: 0,
  simulationTime: 0,
  mode: "ai",
};

const FIGURES = [
  { file: "boxplot_avg_wait_time.png", title: "Boxplot — Tempo médio de espera" },
  { file: "boxplot_flow_rate.png", title: "Boxplot — Taxa de fluxo" },
  { file: "boxplot_co2_emissions.png", title: "Boxplot — Emissões de CO2" },
  { file: "boxplot_emergency_response_time.png", title: "Boxplot — Resposta de emergência" },
  { file: "boxplot_total_collisions.png", title: "Boxplot — Colisões totais" },
  { file: "boxplot_collision_avoided.png", title: "Boxplot — Colisões evitadas" },
  { file: "bar_ci_avg_wait_time.png", title: "Média + CI95 — Tempo médio de espera" },
  { file: "bar_ci_flow_rate.png", title: "Média + CI95 — Taxa de fluxo" },
  { file: "bar_ci_co2_emissions.png", title: "Média + CI95 — Emissões de CO2" },
  { file: "bar_ci_emergency_response_time.png", title: "Média + CI95 — Resposta de emergência" },
  { file: "bar_ci_total_collisions.png", title: "Média + CI95 — Colisões totais" },
  { file: "bar_ci_collision_avoided.png", title: "Média + CI95 — Colisões evitadas" },
];

function App() {
  const [config, setConfig] = React.useState(INITIAL_CONFIG);
  const [activeRules, setActiveRules] = React.useState([]);
  const [metrics, setMetrics] = React.useState(INITIAL_METRICS);
  const [comparison, setComparison] = React.useState(INITIAL_METRICS);
  const [showFigures, setShowFigures] = React.useState(false);
  const [figuresVersion, setFiguresVersion] = React.useState(Date.now());
  const engineRef = React.useRef(null);

  React.useEffect(() => {
    const engine = new SimulationEngine(INITIAL_CONFIG.gridSize);
    engine.setScenario(INITIAL_CONFIG.scenario);
    engine.setMode(INITIAL_CONFIG.mode);
    engine.setSpeed(INITIAL_CONFIG.speed);
    engine.start();
    engineRef.current = engine;

    return () => {
      if (engineRef.current) {
        engineRef.current.pause();
      }
    };
  }, []);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      const engine = engineRef.current;
      if (!engine) return;
      setMetrics(engine.getMetrics());
      setComparison(engine.getComparisonMetrics());
    }, 300);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="App" style={{ height: "100vh", width: "100vw", background: "#050505" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <ControlPanel
          config={config}
          setConfig={setConfig}
          engineRef={engineRef}
          activeRules={activeRules}
          setActiveRules={setActiveRules}
        />

        <main style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <button
            onClick={() => setShowFigures(true)}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 20,
              borderRadius: 8,
              border: "1px solid #52525b",
              background: "rgba(12,12,15,0.9)",
              color: "#fafafa",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Ver gráficos
          </button>

          <SimulationCanvas engineRef={engineRef} />
          <MetricsWidget
            metrics={metrics}
            comparison={comparison}
            config={config}
          />
        </main>
      </div>

      {showFigures && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              width: "min(1200px, 95vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#0f0f10",
              border: "1px solid #3f3f46",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ color: "#fafafa", margin: 0 }}>Resultados Experimentais</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setFiguresVersion(Date.now())}
                  style={{
                    borderRadius: 8,
                    border: "1px solid #52525b",
                    background: "#2563eb",
                    color: "#fafafa",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  Atualizar gráficos
                </button>
                <button
                  onClick={() => setShowFigures(false)}
                  style={{
                    borderRadius: 8,
                    border: "1px solid #52525b",
                    background: "transparent",
                    color: "#fafafa",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 14 }}>
              {FIGURES.map((figure) => (
                <figure
                  key={figure.file}
                  style={{ margin: 0, border: "1px solid #27272a", borderRadius: 10, padding: 10, background: "#18181b" }}
                >
                  <img
                    src={`/figuras/${figure.file}?v=${figuresVersion}`}
                    alt={figure.title}
                    style={{ width: "100%", borderRadius: 8, background: "#fff" }}
                  />
                  <figcaption style={{ color: "#d4d4d8", fontSize: 12, marginTop: 8 }}>
                    {figure.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
