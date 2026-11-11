
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROLE_LABELS, ROLES } from '../utils/constants'

export default function UnauthorizedPage() {
  const { user, logout } = useAuth()
  const isCreator = user?.role === ROLES.CREATOR

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Access restricted
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {isCreator
            ? "You don't have permission to view this page."
            : `Your account role (${ROLE_LABELS[user?.role] ?? 'Unknown'}) doesn't have a dashboard in this version of CreatorIQ.`}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {isCreator && (
            <Link
              to="/dashboard"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to dashboard
            </Link>
          )}

          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}
