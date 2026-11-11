
const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const fullFormatter = new Intl.NumberFormat('en-US')

export function formatCompact(value) {
  return compactFormatter.format(value)
}

export function formatNumber(value) {
  return fullFormatter.format(value)
}

export function formatPercent(value, digits = 1) {
  return `${value.toFixed(digits)}%`
}

export function formatChange(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function formatShortDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function truncate(text, maxLength) {
  return text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text
}

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) return '?'

  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''

  return (first + last).toUpperCase()
}
