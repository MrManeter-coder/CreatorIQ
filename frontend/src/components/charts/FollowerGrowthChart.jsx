
import {
  Area,
  AreaChart,
  CartesianGrid,
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

export default function FollowerGrowthChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="followersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.emerald} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.emerald} stopOpacity={0} />
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
            domain={['auto', 'auto']}
            width={48}
          />

          <Tooltip
            formatter={(value) => [formatNumber(value), 'Followers']}
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
          />

          <Area
            type="monotone"
            dataKey="followers"
            name="Followers"
            stroke={CHART_COLORS.emerald}
            strokeWidth={2.5}
            fill="url(#followersFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
