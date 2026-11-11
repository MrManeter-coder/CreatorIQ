
import { formatNumber, formatPercent, formatShortDate } from '../../utils/formatters'

const PLATFORM_STYLES = {
  YouTube: 'bg-red-50 text-red-700',
  Instagram: 'bg-pink-50 text-pink-700',
  TikTok: 'bg-slate-100 text-slate-700',
}

const HEADERS = [
  { label: 'Content', align: 'text-left' },
  { label: 'Platform', align: 'text-left' },
  { label: 'Published', align: 'text-left' },
  { label: 'Views', align: 'text-right' },
  { label: 'Likes', align: 'text-right' },
  { label: 'Comments', align: 'text-right' },
  { label: 'Eng. rate', align: 'text-right' },
]

export default function RecentContentTable({ items }) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">No content matches your search.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            {HEADERS.map((header) => (
              <th key={header.label} className={`px-3 py-3 font-medium ${header.align}`}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-3 py-3.5">
                <p className="max-w-xs truncate font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.type}</p>
              </td>
              <td className="px-3 py-3.5">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${PLATFORM_STYLES[item.platform] ?? 'bg-slate-100 text-slate-700'}`}>
                  {item.platform}
                </span>
              </td>
              <td className="px-3 py-3.5 text-slate-600">{formatShortDate(item.publishedAt)}</td>
              <td className="px-3 py-3.5 text-right font-medium text-slate-900">{formatNumber(item.views)}</td>
              <td className="px-3 py-3.5 text-right text-slate-600">{formatNumber(item.likes)}</td>
              <td className="px-3 py-3.5 text-right text-slate-600">{formatNumber(item.comments)}</td>
              <td className="px-3 py-3.5 text-right font-medium text-emerald-600">{formatPercent(item.engagementRate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
