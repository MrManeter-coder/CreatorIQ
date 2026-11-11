
import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import ChartCard from '../components/charts/ChartCard'
import TopContentChart from '../components/charts/TopContentChart'
import RecentContentTable from '../components/dashboard/RecentContentTable'
import { filterContentByTitle, getContentPerformance, getTopContent } from '../utils/analytics'
import { formatNumber, formatPercent } from '../utils/formatters'

function StatTile({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
    </div>
  )
}

export default function ContentAnalyticsPage() {
  const { searchTerm } = useOutletContext()
  const allContent = useMemo(() => getContentPerformance(), [])
  const topContent = useMemo(() => getTopContent(5), [])
  const filteredContent = useMemo(() => filterContentByTitle(allContent, searchTerm), [allContent, searchTerm])

  const totalViews = allContent.reduce((sum, item) => sum + item.views, 0)
  const averageEngagement = allContent.reduce((sum, item) => sum + item.engagementRate, 0) / allContent.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Content analytics</h2>
        <p className="mt-1 text-sm text-slate-500">See how each piece of content is performing across platforms.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Published pieces" value={allContent.length} />
        <StatTile label="Combined views" value={formatNumber(totalViews)} />
        <StatTile label="Average engagement rate" value={formatPercent(averageEngagement)} />
      </div>
      <ChartCard title="Top-performing content" subtitle="Ranked by total views">
        <TopContentChart data={topContent} />
      </ChartCard>
      <ChartCard title="All content" subtitle="Newest first. Use the search box above to filter.">
        <RecentContentTable items={filteredContent} />
      </ChartCard>
    </div>
  )
}
