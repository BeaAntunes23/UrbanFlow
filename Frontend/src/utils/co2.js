export const CO2_THRESHOLDS = [
  { label: 'Bom',       max: 50,       color: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  { label: 'Aceitável', max: 200,      color: '#f97316', bg: 'bg-orange-500/10',  text: 'text-orange-400' },
  { label: 'Elevado',   max: Infinity, color: '#ef4444', bg: 'bg-red-500/10',     text: 'text-red-400'    },
];

export const classificarCo2 = (valor) =>
  CO2_THRESHOLDS.find((t) => valor <= t.max);
