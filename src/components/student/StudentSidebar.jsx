import { Crown, Home, LogOut, Settings, Trophy, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/Codypluslogo.png'
import StudentSummary from './StudentSummary.jsx'

const navigation = [
  { title: 'الرئيسية', icon: Home, to: '/student' },
  { title: 'الإنجازات', icon: Trophy },
  { title: 'المتصدرون', icon: Crown },
  { title: 'الملف الشخصي', icon: User },
  { title: 'الإعدادات', icon: Settings },
]

export default function StudentSidebar({ student, xp, onNavigate }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex h-[76px] shrink-0 items-center border-b border-[#E5E7EB] px-7">
        <img src={logo} alt="Cody+" className="h-auto w-28 object-contain" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <StudentSummary student={student} xp={xp} />
        <nav aria-label="تنقل الطالب" className="space-y-1 px-3 py-4">
          {navigation.map(({ title, icon: Icon, to }) => {
            const content = <><Icon size={19} strokeWidth={1.7} aria-hidden="true" /><span>{title}</span></>
            return to ? (
              <NavLink key={title} to={to} end onClick={onNavigate} className="flex items-center gap-3 rounded-full bg-[#023E8A] px-4 py-3 text-sm font-medium text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]">{content}</NavLink>
            ) : (
              <button key={title} type="button" disabled className="flex w-full cursor-not-allowed items-center gap-3 rounded-full px-4 py-3 text-sm text-[#4B556B]">{content}</button>
            )
          })}
        </nav>
      </div>
      <div className="shrink-0 border-t border-[#E5E7EB] p-5">
        <button type="button" disabled title="تسجيل الخروج غير متاح حالياً" className="flex cursor-not-allowed items-center gap-3 py-2 text-sm text-[#F05262]"><LogOut size={19} aria-hidden="true" />تسجيل الخروج</button>
      </div>
    </div>
  )
}
