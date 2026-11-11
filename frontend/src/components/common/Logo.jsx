
export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold ${light ? 'bg-white/15 text-white' : 'bg-indigo-600 text-white'}`}>
        C
      </span>
      <span className={`text-xl font-semibold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        CreatorIQ
      </span>
    </div>
  )
}
