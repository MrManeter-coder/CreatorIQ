
import Icon from '../common/Icon'
import { formatChange } from '../../utils/formatters'

const TONES = {
  indigo: 'bg-indigo-50 text-indigo-600',
  rose: 'bg-rose-50 text-rose-600',
  sky: 'bg-sky-50 text-sky-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
}

export default function KpiCard({ label, value, change, icon, tone = 'indigo', className = '' }) {
  const isPositive = change >= 0

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-1.5 text-xs">
        <span className={`inline-flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          <Icon name={isPositive ? 'trendUp' : 'trendDown'} className="h-4 w-4" />
          {formatChange(change)}
        </span>
        <span className="text-slate-400">vs previous period</span>
      </div>
    </div>
  )
}
