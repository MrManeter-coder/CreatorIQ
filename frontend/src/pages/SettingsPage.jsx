
import { useAuth } from '../hooks/useAuth'
import { ROLE_LABELS } from '../utils/constants'
import { getInitials } from '../utils/formatters'

export default function SettingsPage() {
  const { user } = useAuth()

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const details = [
    { label: 'Full name', value: user.full_name },
    { label: 'Email', value: user.email },
    { label: 'Role', value: ROLE_LABELS[user.role] },
    { label: 'Account status', value: user.is_active ? 'Active' : 'Deactivated' },
    { label: 'Member since', value: memberSince },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Your account details.</p>
      </div>
      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
            {getInitials(user.full_name)}
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900">{user.full_name}</p>
            <span className="mt-1 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">{ROLE_LABELS[user.role]}</span>
          </div>
        </div>
        <dl className="divide-y divide-slate-100">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm text-slate-500">{item.label}</dt>
              <dd className="text-sm font-medium text-slate-900">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-slate-400">Profile editing is not available in this version.</p>
      </section>
    </div>
  )
}
