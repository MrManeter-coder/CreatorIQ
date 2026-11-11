
export const MOCK_DAYS = 180

function mulberry32(seed) {
  let state = seed

  return function random() {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function daysAgoISO(days) {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - days)

  return toISODate(date)
}

function buildDailyMetrics() {
  const random = mulberry32(2024)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let followers = 38200
  const rows = []

  for (let offset = MOCK_DAYS - 1; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)

    const dayIndex = MOCK_DAYS - 1 - offset
    const growthFactor = 1 + dayIndex * 0.004
    const weekendFactor =
      date.getDay() === 0 || date.getDay() === 6 ? 1.18 : 1
    const spikeFactor = random() > 0.96 ? 1.8 : 1

    const views = Math.round(
      4200 * growthFactor * weekendFactor * spikeFactor * (0.85 + random() * 0.3)
    )

    const reach = Math.round(views * (0.76 + random() * 0.08))
    const likes = Math.round(views * (0.029 + random() * 0.006))
    const comments = Math.round(views * (0.003 + random() * 0.002))
    const shares = Math.round(views * (0.004 + random() * 0.002))
    const saves = Math.round(views * (0.006 + random() * 0.002))
    const newFollowers = Math.round(views * (0.006 + random() * 0.004))

    followers += newFollowers

    rows.push({
      date: toISODate(date),
      views,
      reach,
      likes,
      comments,
      shares,
      saves,
      newFollowers,
      followers,
    })
  }

  return rows
}

export const dailyMetrics = buildDailyMetrics()

export const contentItems = [
  { id: 1, title: '5 Editing Mistakes Every Beginner Makes', platform: 'YouTube', type: 'Video', publishedAt: daysAgoISO(3), views: 48200, reach: 39100, likes: 2150, comments: 240, shares: 220, saves: 290 },
  { id: 2, title: 'My Minimal Desk Setup Tour', platform: 'Instagram', type: 'Reel', publishedAt: daysAgoISO(5), views: 36800, reach: 29500, likes: 1900, comments: 190, shares: 310, saves: 410 },
  { id: 3, title: 'How I Plan a Week of Content in 30 Minutes', platform: 'YouTube', type: 'Video', publishedAt: daysAgoISO(8), views: 29400, reach: 23800, likes: 1320, comments: 160, shares: 140, saves: 330 },
  { id: 4, title: 'Camera Settings Cheat Sheet', platform: 'Instagram', type: 'Post', publishedAt: daysAgoISO(10), views: 18900, reach: 16200, likes: 780, comments: 85, shares: 160, saves: 520 },
  { id: 5, title: 'Rating Viewer Thumbnails (Brutally Honest)', platform: 'YouTube', type: 'Video', publishedAt: daysAgoISO(12), views: 41700, reach: 33900, likes: 1980, comments: 530, shares: 210, saves: 190 },
  { id: 6, title: 'POV: Your First 1,000 Subscribers', platform: 'TikTok', type: 'Short', publishedAt: daysAgoISO(14), views: 62300, reach: 51200, likes: 3100, comments: 160, shares: 450, saves: 220 },
  { id: 7, title: '3 Free Tools I Use Every Day', platform: 'Instagram', type: 'Reel', publishedAt: daysAgoISO(17), views: 24100, reach: 19800, likes: 1090, comments: 70, shares: 180, saves: 260 },
  { id: 8, title: 'Behind the Scenes: Shooting a Product Review', platform: 'YouTube', type: 'Video', publishedAt: daysAgoISO(20), views: 15200, reach: 12600, likes: 610, comments: 74, shares: 55, saves: 90 },
  { id: 9, title: 'Stop Doing This With Your Hook', platform: 'TikTok', type: 'Short', publishedAt: daysAgoISO(23), views: 38900, reach: 32100, likes: 1650, comments: 98, shares: 240, saves: 130 },
  { id: 10, title: 'Q&A: Your Questions About Going Full-Time', platform: 'YouTube', type: 'Video', publishedAt: daysAgoISO(27), views: 21800, reach: 17900, likes: 940, comments: 410, shares: 70, saves: 85 },
  { id: 11, title: 'Color Grading in 60 Seconds', platform: 'Instagram', type: 'Reel', publishedAt: daysAgoISO(31), views: 12700, reach: 10400, likes: 520, comments: 38, shares: 66, saves: 110 },
  { id: 12, title: 'Weekly Creator Tips Roundup', platform: 'Instagram', type: 'Post', publishedAt: daysAgoISO(35), views: 8300, reach: 7100, likes: 330, comments: 21, shares: 28, saves: 74 },
]

export const ageDistribution = [
  { range: '13–17', share: 4 },
  { range: '18–24', share: 31 },
  { range: '25–34', share: 38 },
  { range: '35–44', share: 17 },
  { range: '45+', share: 10 },
]

export const genderDistribution = [
  { name: 'Female', value: 46 },
  { name: 'Male', value: 51 },
  { name: 'Other', value: 3 },
]
