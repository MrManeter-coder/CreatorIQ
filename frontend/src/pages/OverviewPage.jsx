
import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ChartCard from '../components/charts/ChartCard'
import DonutChart from '../components/charts/DonutChart'
import FollowerGrowthChart from '../components/charts/FollowerGrowthChart'
import TopContentChart from '../components/charts/TopContentChart'
import ViewsOverTimeChart from '../components/charts/ViewsOverTimeChart'
import { withPalette } from '../components/charts/chartConfig'
import KpiCard from '../components/dashboard/KpiCard'
import RangeToggle from '../components/dashboard/RangeToggle'
import RecentContentTable from '../components/dashboard/RecentContentTable'
import { useAuth } from '../hooks/useAuth'
import { filterContentByTitle, getContentPerformance, getOverview, getTopContent } from '../utils/analytics'
import { formatCompact, formatNumber, formatPercent } from '../utils/formatters'

export default function OverviewPage() {
  const { searchTerm } = useOutletContext()
  const { user } = useAuth()
  const [days, setDays] = useState(30)

  const overview = useMemo(() => getOverview(days), [days])
  const engagementData = useMemo(() => withPalette(overview.engagementBreakdown), [overview])
  const topContent = useMemo(() => getTopContent(5), [])
  const recentContent = useMemo(() => filterContentByTitle(getContentPerformance(), searchTerm).slice(0, 8), [searchTerm])

  const { kpis } = overview
  const totalInteractions = engagementData.reduce((sum, item) => sum + item.value, 0)
  const firstName = user.full_name.split(' ')[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back, {firstName}</h2>
          <p className="mt-1 text-sm text-slate-500">Here is how your content performed over the last {days} days.</p>
        </div>
        <RangeToggle value={days} onChange={setDays} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total Views" value={formatNumber(kpis.views.value)} change={kpis.views.change} icon="views" tone="indigo" />
        <KpiCard label="Total Likes" value={formatNumber(kpis.likes.value)} change={kpis.likes.change} icon="likes" tone="rose" />
        <KpiCard label="Total Comments" value={formatNumber(kpis.comments.value)} change={kpis.comments.change} icon="comments" tone="sky" />
        <KpiCard label="Total Followers" value={formatNumber(kpis.followers.value)} change={kpis.followers.change} icon="followers" tone="emerald" />
        <KpiCard label="Engagement Rate" value={formatPercent(kpis.engagementRate.value)} change={kpis.engagementRate.change} icon="engagement" tone="amber" className="sm:col-span-2 xl:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard className="xl:col-span-2" title="Views over time" subtitle="Daily views and reach">
          <ViewsOverTimeChart data={overview.viewsSeries} />
        </ChartCard>
        <ChartCard title="Engagement breakdown" subtitle="Interactions by type">
          <DonutChart data={engagementData} centerLabel="Interactions" centerValue={formatCompact(totalInteractions)} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Follower growth" subtitle="Total followers over time">
          <FollowerGrowthChart data={overview.followerSeries} />
        </ChartCard>
        <ChartCard title="Top-performing content" subtitle="Ranked by total views">
          <TopContentChart data={topContent} />
        </ChartCard>
      </div>

      <ChartCard title="Recent content performance" subtitle="Your latest published content">
        <RecentContentTable items={recentContent} />
      </ChartCard>
    </div>
  )
}
