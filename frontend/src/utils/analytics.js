
import {
  ageDistribution,
  contentItems,
  dailyMetrics,
  genderDistribution,
} from '../data/mockAnalytics'

import { formatShortDate } from './formatters'

function sum(rows, field) {
  return rows.reduce((total, row) => total + row[field], 0)
}

function percentChange(current, previous) {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

function calculateEngagementRate({ likes, comments, shares, saves, reach }) {
  if (reach === 0) return 0

  return ((likes + comments + shares + saves) / reach) * 100
}

function totals(rows) {
  return {
    views: sum(rows, 'views'),
    reach: sum(rows, 'reach'),
    likes: sum(rows, 'likes'),
    comments: sum(rows, 'comments'),
    shares: sum(rows, 'shares'),
    saves: sum(rows, 'saves'),
  }
}

export function getOverview(days) {
  const currentRows = dailyMetrics.slice(-days)
  const previousRows = dailyMetrics.slice(-days * 2, -days)

  const current = totals(currentRows)
  const previous = totals(previousRows)

  const followersNow = currentRows[currentRows.length - 1].followers
  const followersBefore = previousRows[previousRows.length - 1].followers

  const currentEngagement = calculateEngagementRate(current)
  const previousEngagement = calculateEngagementRate(previous)

  return {
    kpis: {
      views: {
        value: current.views,
        change: percentChange(current.views, previous.views),
      },
      likes: {
        value: current.likes,
        change: percentChange(current.likes, previous.likes),
      },
      comments: {
        value: current.comments,
        change: percentChange(current.comments, previous.comments),
      },
      followers: {
        value: followersNow,
        change: percentChange(followersNow, followersBefore),
      },
      engagementRate: {
        value: currentEngagement,
        change: percentChange(currentEngagement, previousEngagement),
      },
    },

    viewsSeries: currentRows.map((row) => ({
      label: formatShortDate(row.date),
      views: row.views,
      reach: row.reach,
    })),

    followerSeries: currentRows.map((row) => ({
      label: formatShortDate(row.date),
      followers: row.followers,
    })),

    engagementBreakdown: [
      { name: 'Likes', value: current.likes },
      { name: 'Comments', value: current.comments },
      { name: 'Shares', value: current.shares },
      { name: 'Saves', value: current.saves },
    ],
  }
}

export function getContentPerformance() {
  return contentItems
    .map((item) => ({
      ...item,
      engagementRate: calculateEngagementRate(item),
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getTopContent(limit = 5) {
  return [...getContentPerformance()]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

export function filterContentByTitle(items, searchTerm) {
  const query = searchTerm.trim().toLowerCase()

  if (!query) return items

  return items.filter((item) =>
    item.title.toLowerCase().includes(query)
  )
}

export function getAudienceDemographics() {
  return {
    age: ageDistribution,
    gender: genderDistribution,
  }
}
