
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
  formatCompact,
  formatNumber,
  truncate,
} from '../../utils/formatters'

import {
  AXIS_TICK,
  CHART_COLORS,
  TOOLTIP_LABEL_STYLE,
  TOOLTIP_STYLE,
} from './chartConfig'

export default function TopContentChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            horizontal={false}
          />

          <XAxis
            type="number"
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCompact}
          />

          <YAxis
            type="category"
            dataKey="title"
            width={150}
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            tickFormatter={(title) => truncate(title, 24)}
          />

          <Tooltip
            cursor={{ fill: '#f1f5f9' }}
            formatter={(value) => [formatNumber(value), 'Views']}
            contentStyle={TOOLTIP_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
          />

          <Bar
            dataKey="views"
            name="Views"
            fill={CHART_COLORS.indigo}
            radius={[0, 6, 6, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
