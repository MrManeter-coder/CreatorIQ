
import Logo from '../components/common/Logo'

const HIGHLIGHTS = [
  'Track views, likes, and follower growth in one place',
  'Compare content performance at a glance',
  'Built for creators, agencies, and marketing teams',
]

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-600 p-12 text-white lg:flex">
        <Logo light />

        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Understand your audience. Grow your content.
          </h2>

          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-indigo-100">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-indigo-200">
          CreatorIQ – Creator Analytics Dashboard
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-6 text-center text-sm text-slate-600">
            {footer}
          </p>
        </div>
      </main>
    </div>
  )
}
