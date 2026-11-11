
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  formatCompact,
  formatNumber,
} from '../../utils/formatters'

import {
  AXIS_TICK,
  CHART_COLORS,
  TOOLTIP_LABEL_STYLE,
  TOOLTIP_STYLE,
} from './chartConfig'

export default function ViewsOverTimeChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.indigo} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.indigo} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            minTickGap={28}
          />

          <YAxis
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCompact}
            width={48}
          />

          <Tooltip
            formatter={(value, name) => [formatNumber(value), name]}
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
          />

          <Legend
            iconType="circle"
            verticalAlign="top"
            align="right"
            height={32}
          />

          <Area
            type="monotone"
            dataKey="views"
            name="Views"
            stroke={CHART_COLORS.indigo}
            strokeWidth={2.5}
            fill="url(#viewsFill)"
          />

          <Area
            type="monotone"
            dataKey="reach"
            name="Reach"
            stroke={CHART_COLORS.cyan}
            strokeWidth={2}
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
