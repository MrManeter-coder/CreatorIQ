
import { useMemo, useState } from 'react'
import AgeDistributionChart from '../components/charts/AgeDistributionChart'
import ChartCard from '../components/charts/ChartCard'
import DonutChart from '../components/charts/DonutChart'
import FollowerGrowthChart from '../components/charts/FollowerGrowthChart'
import { withPalette } from '../components/charts/chartConfig'
import RangeToggle from '../components/dashboard/RangeToggle'
import { getAudienceDemographics, getOverview } from '../utils/analytics'

export default function AudiencePage() {
  const [days, setDays] = useState(30)
  const overview = useMemo(() => getOverview(days), [days])
  const demographics = useMemo(() => getAudienceDemographics(), [])
  const genderData = useMemo(() => withPalette(demographics.gender), [demographics])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Audience</h2>
          <p className="mt-1 text-sm text-slate-500">Follower growth and who your audience is (sample data).</p>
        </div>
        <RangeToggle value={days} onChange={setDays} />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard className="xl:col-span-2" title="Follower growth" subtitle={`Total followers over the last ${days} days`}>
          <FollowerGrowthChart data={overview.followerSeries} />
        </ChartCard>
        <ChartCard title="Gender distribution" subtitle="Share of audience">
          <DonutChart data={genderData} valueFormatter={(value) => `${value}%`} showShare={false} />
        </ChartCard>
      </div>
      <ChartCard title="Age distribution" subtitle="Share of audience by age group">
        <AgeDistributionChart data={demographics.age} />
      </ChartCard>
    </div>
  )
}
