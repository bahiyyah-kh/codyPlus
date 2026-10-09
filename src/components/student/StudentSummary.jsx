import { GraduationCap, Star } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

export function StudentAvatar() {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#CAF0F8]" aria-hidden="true">
      <GraduationCap size={25} className="text-[#023E8A]" strokeWidth={1.7} />
    </span>
  )
}

export default function StudentSummary({ student, xp }) {
  return (
    <section aria-label="ملخص الطالب" className="border-b border-[#E5E7EB] px-5 py-5">
      <div className="mb-3 flex items-center gap-3">
        <StudentAvatar />
        <div>
          <p className="font-bold">{student.name}</p>
          <p className="flex items-center gap-1 text-xs text-[#7C8599]"><Star size={13} className="text-[#FBB02D]" /><span dir="ltr">{xp} XP</span></p>
        </div>
      </div>
      <ProgressBar value={xp / student.levelXp * 100} label="التقدم نحو المستوى التالي" />
      <p className="mt-2 text-xs text-[#7C8599]"><span dir="ltr" className="inline-block">{xp} / {student.levelXp} XP</span> للمستوى التالي</p>
    </section>
  )
}
