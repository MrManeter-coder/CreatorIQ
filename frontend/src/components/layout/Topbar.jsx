
import { useLocation } from 'react-router-dom'
import Icon from '../common/Icon'
import { useAuth } from '../../hooks/useAuth'
import { NAV_ITEMS, ROLE_LABELS } from '../../utils/constants'
import { getInitials } from '../../utils/formatters'

export default function Topbar({ searchTerm, onSearchChange, onMenuClick }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const currentItem = NAV_ITEMS.find((item) => item.to === pathname)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button type="button" onClick={onMenuClick} aria-label="Open menu" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
        <Icon name="menu" />
      </button>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Creator Dashboard</p>
        <h1 className="truncate text-lg font-semibold leading-tight text-slate-900">{currentItem?.label ?? 'Dashboard'}</h1>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden w-72 md:block">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon name="search" className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search content by title…"
            aria-label="Search content"
            className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{getInitials(user?.full_name)}</span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.full_name}</p>
            <p className="text-xs text-slate-500">{ROLE_LABELS[user?.role]}</p>
          </div>
        </div>
        <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Icon name="logout" className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
