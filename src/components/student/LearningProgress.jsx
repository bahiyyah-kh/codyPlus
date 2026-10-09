import { Map } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

export default function LearningProgress({ student, journey }) {
  return (
    <header className="border-b border-[#E5E7EB] bg-white px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-[680px]">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold"><Map size={23} strokeWidth={1.8} aria-hidden="true" />رحلتي التعليمية</h1>
            <p className="mt-1 text-sm text-[#7C8599]">مرحباً {student.name}، واصل تقدمك!</p>
          </div>
          <div className="flex shrink-0 items-center text-center">
            <div className="px-4"><p dir="ltr" className="text-xl font-extrabold text-[#023E8A]">{journey.xp}</p><p className="text-xs text-[#7C8599]">نقطة <span dir="ltr">XP</span></p></div>
            <div className="border-r border-[#E5E7EB] pr-4"><p dir="ltr" className="text-xl font-extrabold text-[#023E8A]">{journey.completedCount}/{journey.totalCount}</p><p className="text-xs text-[#7C8599]">نشاط مكتمل</p></div>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs"><span className="text-[#7C8599]">التقدم الإجمالي</span><span dir="ltr" className="font-medium text-[#023E8A]">{journey.percent}%</span></div>
          <ProgressBar value={journey.percent} label="التقدم الإجمالي" />
        </div>
      </div>
    </header>
  )
}
