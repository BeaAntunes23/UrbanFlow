import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;
const LOCAL_API = 'http://localhost:8000/api';

const SCENARIOS = [
  { value: 'normal', label: 'Fluxo Normal' },
  { value: 'rush_hour', label: 'Hora de Ponta' },
  { value: 'accident', label: 'Acidente' },
  { value: 'emergency', label: 'Veículo de Emergência' },
];

const SPEEDS = [0, 1, 2, 5];

const EXAMPLE_RULES = [
  'Dar prioridade a ambulâncias em todos os cruzamentos',
  'Reduzir o tempo de espera dos carros durante a hora de ponta',
  'Dar sinal verde aos autocarros entre as 8h e as 9h',
  'Bloquear cruzamento devido a acidente na Rua Principal',
];

const fieldStyle = {
  width: '100%',
  padding: 8,
  borderRadius: 6,
  border: '1px solid #3f3f46',
  background: '#ffffff',
  color: '#111111',
};

const buildLocalRuleFromText = (text) => {
  const normalized = text.toLowerCase();

  let type = 'timing';
  let target = 'all';
  const action = {
    green_priority: false,
    extend_green_seconds: null,
    block_intersection: false,
    reduce_wait_factor: null,
  };

  if (normalized.includes('ambul')) {
    type = 'priority';
    target = 'ambulance';
    action.green_priority = true;
  }

  if (normalized.includes('autocarro') || normalized.includes('bus')) {
    type = 'priority';
    target = 'bus';
    action.green_priority = true;
  }

  if (normalized.includes('bloque') || normalized.includes('acidente')) {
    type = 'block';
    action.block_intersection = true;
  }

  if (normalized.includes('reduz') || normalized.includes('espera')) {
    type = 'timing';
    action.extend_green_seconds = 8;
    action.reduce_wait_factor = 0.8;
  }

  return {
    type,
    target,
    conditions: {
      time_start: null,
      time_end: null,
      scenario: null,
      location: 'all',
    },
    action,
    description_pt: text,
    source: 'local-fallback',
  };
};

export const ControlPanel = ({ config, setConfig, engineRef, activeRules, setActiveRules }) => {
  const [ruleText, setRuleText] = useState('');
  const [translating, setTranslating] = useState(false);

  const applyConfig = (nextConfig) => {
    const engine = engineRef.current;
    if (!engine) return;

    if (nextConfig.scenario !== config.scenario) {
      engine.setScenario(nextConfig.scenario);
    }

    if (nextConfig.mode !== config.mode) {
      engine.setMode(nextConfig.mode);
    }

    if (nextConfig.gridSize !== config.gridSize) {
      engine.setGridSize(nextConfig.gridSize);
    }

    if (nextConfig.speed !== config.speed) {
      engine.setSpeed(nextConfig.speed);
    }

    if (nextConfig.running) {
      engine.start();
    } else {
      engine.pause();
    }
  };

  const updateConfig = (patch) => {
    setConfig((previous) => {
      const next = { ...previous, ...patch };
      applyConfig(next);
      return next;
    });
  };

  const handlePlayPause = () => {
    updateConfig({ running: !config.running });
  };

  const handleReset = () => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.initGrid();
    engine.start();
    setConfig((previous) => ({ ...previous, running: true }));
    toast.success('Simulação reiniciada');
  };

  const handleApplyRule = async () => {
    if (!ruleText.trim()) return;

    const engine = engineRef.current;
    if (!engine) return;

    setTranslating(true);
    try {
      let response;
      try {
        response = await axios.post(`${API}/rules/translate`, { text: ruleText }, { timeout: 8000 });
      } catch (primaryError) {
        if (API !== LOCAL_API) {
          response = await axios.post(`${LOCAL_API}/rules/translate`, { text: ruleText }, { timeout: 8000 });
          toast.info('Backend remoto indisponível. A usar backend local.');
        } else {
          throw primaryError;
        }
      }

      if (!(response?.data?.ok && response?.data?.rule)) {
        throw new Error(response?.data?.error || 'Não foi possível traduzir a regra');
      }

      const appliedRule = engine.applyRule(response.data.rule);
      setActiveRules((previous) => [
        ...previous,
        { ...appliedRule, originalText: ruleText },
      ]);
      setRuleText('');
      toast.success('Regra aplicada com sucesso');
    } catch (error) {
      const localRule = buildLocalRuleFromText(ruleText);
      const appliedRule = engine.applyRule(localRule);
      setActiveRules((previous) => [
        ...previous,
        { ...appliedRule, originalText: ruleText },
      ]);
      setRuleText('');
      toast.info('Regra aplicada localmente (fallback sem backend).');
    } finally {
      setTranslating(false);
    }
  };

  const handleRemoveRule = (ruleId) => {
    const engine = engineRef.current;
    if (!engine) return;

    engine.removeRule(ruleId);
    setActiveRules((previous) => previous.filter((rule) => rule.id !== ruleId));
    toast.success('Regra removida');
  };

  return (
    <aside
      data-testid="control-panel"
      style={{
        width: 330,
        borderRight: '1px solid #27272a',
        background: '#0c0c0f',
        color: '#f4f4f5',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20 }}>UrbanFlow AI</h2>
      <p style={{ marginTop: 6, color: '#a1a1aa', fontSize: 12 }}>Sistema de Tráfego Inteligente</p>

      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>Cenário</div>
          <select
            value={config.scenario}
            onChange={(event) => updateConfig({ scenario: event.target.value, running: true })}
            style={fieldStyle}
          >
            {SCENARIOS.map((scenario) => (
              <option key={scenario.value} value={scenario.value}>{scenario.label}</option>
            ))}
          </select>
        </label>

        <div>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>Controlo</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              data-testid="play-pause-btn"
              onClick={handlePlayPause}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: 0,
                color: '#fff',
                background: config.running ? '#dc2626' : '#2563eb',
                cursor: 'pointer',
              }}
            >
              {config.running ? 'Pausar' : 'Iniciar'}
            </button>
            <button
              data-testid="reset-btn"
              onClick={handleReset}
              style={{
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid #3f3f46',
                background: 'transparent',
                color: '#fafafa',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>Velocidade</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {SPEEDS.map((speedValue) => (
              <button
                key={speedValue}
                onClick={() => updateConfig({ speed: speedValue, running: speedValue !== 0 })}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: '1px solid #3f3f46',
                  background: config.speed === speedValue ? '#2563eb' : 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                {speedValue}x
              </button>
            ))}
          </div>
        </div>

        <label>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>Modo</div>
          <select
            value={config.mode}
            onChange={(event) => updateConfig({ mode: event.target.value })}
            style={fieldStyle}
          >
            <option value="ai">IA Otimizada</option>
            <option value="rl">Reinforcement Learning (Q-Learning)</option>
            <option value="traditional">Ciclo Fixo Tradicional</option>
          </select>
        </label>

        <label>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>
            Grelha: {config.gridSize}x{config.gridSize}
          </div>
          <input
            type="range"
            min={2}
            max={10}
            value={config.gridSize}
            onChange={(event) => updateConfig({ gridSize: Number(event.target.value), running: true })}
            style={{ width: '100%' }}
          />
        </label>

        <div>
          <div style={{ fontSize: 12, marginBottom: 4, color: '#a1a1aa' }}>Regra em Linguagem Natural</div>
          <textarea
            value={ruleText}
            onChange={(event) => setRuleText(event.target.value)}
            placeholder="Ex: Dar prioridade a ambulâncias em todos os cruzamentos"
            rows={4}
            style={{
              ...fieldStyle,
              minHeight: 92,
              resize: 'vertical',
            }}
          />
          <button
            data-testid="apply-rule-btn"
            onClick={handleApplyRule}
            disabled={translating || !ruleText.trim()}
            style={{
              marginTop: 8,
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: 0,
              color: '#fff',
              background: translating ? '#52525b' : '#16a34a',
              cursor: translating ? 'not-allowed' : 'pointer',
            }}
          >
            {translating ? 'A traduzir...' : 'Aplicar regra'}
          </button>
        </div>

        {activeRules.length > 0 && (
          <div>
            <div style={{ fontSize: 12, marginBottom: 6, color: '#a1a1aa' }}>Regras ativas</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {activeRules.map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    border: '1px solid #3f3f46',
                    borderRadius: 6,
                    padding: 8,
                    background: '#18181b',
                  }}
                >
                  <div style={{ fontSize: 11, color: '#d4d4d8' }}>{rule.type}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>{rule.originalText}</div>
                  <button
                    onClick={() => handleRemoveRule(rule.id)}
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      border: '1px solid #52525b',
                      background: 'transparent',
                      borderRadius: 6,
                      color: '#f4f4f5',
                      padding: '4px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div style={{ fontSize: 12, marginBottom: 6, color: '#a1a1aa' }}>Exemplos</div>
          <div style={{ display: 'grid', gap: 4 }}>
            {EXAMPLE_RULES.map((exampleRule, index) => (
              <button
                key={index}
                onClick={() => setRuleText(exampleRule)}
                style={{
                  textAlign: 'left',
                  background: 'transparent',
                  border: '1px dashed #52525b',
                  borderRadius: 6,
                  color: '#93c5fd',
                  padding: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {exampleRule}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
