
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  AXIS_TICK,
  CHART_COLORS,
  TOOLTIP_LABEL_STYLE,
  TOOLTIP_STYLE,
} from './chartConfig'

export default function AgeDistributionChart({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            vertical={false}
          />

          <XAxis
            dataKey="range"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            width={44}
          />

          <Tooltip
            cursor={{ fill: '#f1f5f9' }}
            formatter={(value) => [`${value}%`, 'Audience share']}
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
          />

          <Bar
            dataKey="share"
            name="Audience share"
            fill={CHART_COLORS.violet}
            radius={[6, 6, 0, 0]}
            barSize={44}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
