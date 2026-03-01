import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;
const LOCAL_API = 'http://localhost:8000/api';

const cardStyle = {
  border: '1px solid #3f3f46',
  borderRadius: 8,
  padding: 10,
  background: 'rgba(12,12,15,0.9)',
  color: '#fafafa',
};

const toCsv = (rows) => {
  const headers = [
    'timestamp',
    'scenario',
    'mode',
    'grid_size',
    'duration',
    'avg_wait_time',
    'flow_rate',
    'co2_emissions',
    'emergency_response_time',
  ];

  const lines = [headers.join(',')];
  for (const row of rows) {
    const line = headers
      .map((header) => {
        const value = row[header] ?? '';
        const text = String(value);
        if (text.includes(',') || text.includes('"') || text.includes('\n')) {
          return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
      })
      .join(',');
    lines.push(line);
  }

  return lines.join('\n');
};

export const MetricsWidget = ({ metrics, comparison, config, sidebar = false, onOpenFigures }) => {
  const postWithFallback = async (endpoint, body, options = {}) => {
    try {
      return await axios.post(`${API}${endpoint}`, body, { timeout: 8000, ...options });
    } catch (primaryError) {
      if (API !== LOCAL_API) {
        toast.info('Backend remoto indisponível. A usar backend local.');
        return axios.post(`${LOCAL_API}${endpoint}`, body, { timeout: 8000, ...options });
      }
      throw primaryError;
    }
  };

  const handleExport = async () => {
    const snapshot = {
      scenario: config.scenario,
      mode: config.mode,
      grid_size: config.gridSize,
      duration: metrics.simulationTime,
      avg_wait_time: metrics.avgWaitTime,
      flow_rate: metrics.flowRate,
      co2_emissions: metrics.co2Emissions,
      emergency_response_time: metrics.emergencyResponseTime,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await postWithFallback(
        '/metrics/export',
        {
          snapshots: [snapshot],
        },
        { responseType: 'blob' }
      );

      const objectUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'urbanflow_metricas.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
      toast.success('CSV exportado com sucesso');
    } catch (error) {
      const csv = toCsv([snapshot]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'urbanflow_metricas_local.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
      toast.info('Backend indisponível. CSV exportado localmente.');
    }
  };

  const handleSave = async () => {
    const snapshot = {
      scenario: config.scenario,
      mode: config.mode,
      grid_size: config.gridSize,
      duration: metrics.simulationTime,
      avg_wait_time: metrics.avgWaitTime,
      flow_rate: metrics.flowRate,
      co2_emissions: metrics.co2Emissions,
      emergency_response_time: metrics.emergencyResponseTime,
      timestamp: new Date().toISOString(),
    };

    try {
      await postWithFallback('/metrics/save', snapshot);
      toast.success('Métricas guardadas na base de dados');
    } catch (error) {
      const storageKey = 'urbanflow_local_metrics';
      const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
      existing.push(snapshot);
      window.localStorage.setItem(storageKey, JSON.stringify(existing));
      toast.info('Backend indisponível. Métricas guardadas localmente.');
    }
  };

  const comparisonLabel = config.mode === 'traditional' ? 'IA/RL' : 'Tradicional';
  const modeLabel = config.mode === 'ai' ? 'IA' : config.mode === 'rl' ? 'RL' : 'Trad.';

  const cards = [
    {
      title: 'Tempo Médio de Espera',
      value: `${metrics.avgWaitTime}s`,
      comparisonValue: comparison ? `${comparison.avgWaitTime}s` : '-',
    },
    {
      title: 'Taxa de Fluxo',
      value: `${metrics.flowRate} veíc/min`,
      comparisonValue: comparison ? `${comparison.flowRate} veíc/min` : '-',
    },
    {
      title: 'Emissões de CO2',
      value: `${metrics.co2Emissions} kg`,
      comparisonValue: comparison ? `${comparison.co2Emissions} kg` : '-',
    },
    {
      title: 'Resposta de Emergência',
      value: `${metrics.emergencyResponseTime}s`,
      comparisonValue: comparison ? `${comparison.emergencyResponseTime}s` : '-',
    },
    {
      title: 'Colisões Totais',
      value: `${metrics.totalCollisions ?? 0}`,
      comparisonValue: comparison ? `${comparison.totalCollisions ?? 0}` : '-',
    },
    {
      title: 'Colisões Evitadas',
      value: `${metrics.collisionAvoided ?? 0}`,
      comparisonValue: comparison ? `${comparison.collisionAvoided ?? 0}` : '-',
    },
    {
      title: 'Espera Ligeiros',
      value: `${metrics.lightAvgWaitTime ?? 0}s`,
      comparisonValue: comparison ? `${comparison.lightAvgWaitTime ?? 0}s` : '-',
    },
    {
      title: 'Espera Pesados',
      value: `${metrics.heavyAvgWaitTime ?? 0}s`,
      comparisonValue: comparison ? `${comparison.heavyAvgWaitTime ?? 0}s` : '-',
    },
    {
      title: 'Concluídos Ligeiros',
      value: `${metrics.lightVehiclesCompleted ?? 0}`,
      comparisonValue: comparison ? `${comparison.lightVehiclesCompleted ?? 0}` : '-',
    },
    {
      title: 'Concluídos Pesados',
      value: `${metrics.heavyVehiclesCompleted ?? 0}`,
      comparisonValue: comparison ? `${comparison.heavyVehiclesCompleted ?? 0}` : '-',
    },
  ];

  const containerStyle = sidebar
    ? {
        width: 300,
        height: '100%',
        boxSizing: 'border-box',
        borderLeft: '1px solid #27272a',
        background: '#0c0c0f',
        display: 'grid',
        gap: 8,
        padding: 16,
        overflowY: 'auto',
      }
    : {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 320,
        display: 'grid',
        gap: 8,
        zIndex: 12,
      };

  return (
    <div
      data-testid="metrics-widget"
      style={containerStyle}
    >
      {sidebar && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            background: '#0c0c0f',
            paddingBottom: 8,
            display: 'grid',
            gap: 8,
          }}
        >
          {typeof onOpenFigures === 'function' && (
            <button
              onClick={onOpenFigures}
              style={{
                borderRadius: 6,
                border: '1px solid #52525b',
                background: 'transparent',
                color: '#fafafa',
                padding: '8px 10px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Ver gráficos
            </button>
          )}

          <div style={{ ...cardStyle, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={handleExport}
              style={{
                flex: 1,
                borderRadius: 6,
                border: '1px solid #52525b',
                background: 'transparent',
                color: '#fafafa',
                padding: '7px 10px',
                cursor: 'pointer',
              }}
            >
              Exportar CSV
            </button>
            <button
              onClick={handleSave}
              style={{
                borderRadius: 6,
                border: 0,
                background: '#16a34a',
                color: '#fff',
                padding: '7px 12px',
                cursor: 'pointer',
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {cards.map((item) => (
        <div key={item.title} style={cardStyle}>
          <div style={{ fontSize: 12, color: '#a1a1aa' }}>{item.title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <strong style={{ fontSize: 18 }}>{item.value}</strong>
            <span style={{ fontSize: 11, color: '#93c5fd' }}>
              {comparisonLabel}: {item.comparisonValue}
            </span>
          </div>
        </div>
      ))}

      {!sidebar && (
        <div style={{ ...cardStyle, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={handleExport}
            style={{
              flex: 1,
              borderRadius: 6,
              border: '1px solid #52525b',
              background: 'transparent',
              color: '#fafafa',
              padding: '7px 10px',
              cursor: 'pointer',
            }}
          >
            Exportar CSV
          </button>
          <button
            onClick={handleSave}
            style={{
              borderRadius: 6,
              border: 0,
              background: '#16a34a',
              color: '#fff',
              padding: '7px 12px',
              cursor: 'pointer',
            }}
          >
            Guardar
          </button>
        </div>
      )}

      <div style={{ ...cardStyle, fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
        <span>{metrics.vehiclesActive} ativos | {metrics.vehiclesCompleted} concluídos</span>
        <strong>{modeLabel}</strong>
      </div>
    </div>
  );
};
