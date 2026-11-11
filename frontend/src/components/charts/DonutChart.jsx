
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { formatNumber } from '../../utils/formatters'
import { TOOLTIP_STYLE } from './chartConfig'

export default function DonutChart({
  data,
  centerLabel,
  centerValue,
  valueFormatter = formatNumber,
  showShare = true,
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div>
      <div className="relative h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.fill} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [valueFormatter(value), name]}
              contentStyle={TOOLTIP_STYLE}
            />
          </PieChart>
        </ResponsiveContainer>

        {centerLabel && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-500">{centerLabel}</span>
            <span className="text-xl font-semibold text-slate-900">
              {centerValue}
            </span>
          </div>
        )}
      </div>

      <ul className="mt-4 space-y-2.5">
        {data.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.name}
            </span>

            <span className="font-medium text-slate-900">
              {valueFormatter(item.value)}

              {showShare && total > 0 && (
                <span className="ml-1.5 font-normal text-slate-400">
                  ({((item.value / total) * 100).toFixed(0)}%)
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
