
export const CHART_COLORS = {
  indigo: '#4f46e5',
  cyan: '#06b6d4',
  violet: '#8b5cf6',
  emerald: '#10b981',
  amber: '#f59e0b',
  grid: '#e2e8f0',
  axis: '#94a3b8',
}

export const DONUT_PALETTE = [
  '#4f46e5',
  '#06b6d4',
  '#8b5cf6',
  '#f59e0b',
]

export const AXIS_TICK = {
  fontSize: 12,
  fill: CHART_COLORS.axis,
}

export const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 25px -5px rgb(15 23 42 / 0.12)',
  fontSize: 13,
}

export const TOOLTIP_LABEL_STYLE = {
  color: '#0f172a',
  fontWeight: 600,
  marginBottom: 4,
}

export function withPalette(items) {
  return items.map((item, index) => ({
    ...item,
    fill: DONUT_PALETTE[index % DONUT_PALETTE.length],
  }))
}
