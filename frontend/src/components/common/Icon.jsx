
import {
  Activity,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Menu,
  X,
  Search,
  LogOut,
  LayoutDashboard,
  FileBarChart,
  UserRound,
  Settings,
} from 'lucide-react'

const icons = {
  views: Eye,
  likes: Heart,
  comments: MessageCircle,
  followers: Users,
  engagement: Activity,
  trendUp: TrendingUp,
  trendDown: TrendingDown,
  menu: Menu,
  close: X,
  search: Search,
  logout: LogOut,
  overview: LayoutDashboard,
  content: FileBarChart,
  audience: UserRound,
  settings: Settings,
}

export default function Icon({ name, className = 'h-5 w-5' }) {
  const Lucide = icons[name] || BarChart3
  return <Lucide className={className} aria-hidden="true" />
}
