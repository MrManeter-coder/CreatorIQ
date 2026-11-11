
export const TOKEN_KEY = 'creatoriq_token'

export const ROLES = {
  CREATOR: 'creator',
  AGENCY: 'agency',
  MARKETING_TEAM: 'marketing_team',
  ADMIN: 'admin',
}

export const ROLE_LABELS = {
  creator: 'Creator',
  agency: 'Agency',
  marketing_team: 'Marketing Team',
  admin: 'Administrator',
}

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: 'overview', end: true },
  { to: '/dashboard/content', label: 'Content Analytics', icon: 'content' },
  { to: '/dashboard/audience', label: 'Audience', icon: 'audience' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
]

export function getHomePath(role) {
  return role === ROLES.CREATOR ? '/dashboard' : '/unauthorized'
}
