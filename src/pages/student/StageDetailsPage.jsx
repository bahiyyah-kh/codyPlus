import { ArrowLeft, ArrowRight, Check, ClipboardList, Code2, Gamepad2, LockKeyhole, Puzzle, Target, Video } from 'lucide-react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import ProgressBar from '../../components/student/ProgressBar.jsx'

const contentContainer = 'mx-auto w-full max-w-[650px]'

const activityIcons = { lesson: Video, puzzle: Puzzle, game: Gamepad2, challenge: Code2, quiz: ClipboardList }

export default function StageDetailsPage() {
  const { journey } = useOutletContext()
  const stage = journey.stages.find(item => item.id === 1)
  if (!stage?.unlocked) return <Navigate to="/student" replace />

  const percent = stage.activities.length ? Math.round(stage.completedCount / stage.activities.length * 100) : 0

  return (
    <>
      <header className="border-b border-[#E5E7EB] bg-white px-4 pt-5 pb-[18px] sm:px-8">
        <div className={contentContainer}>
          <Link to="/student" className="mb-4 inline-flex items-center gap-2 rounded text-xs text-[#7C8599] hover:text-[#023E8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">
            <ArrowRight size={14} aria-hidden="true" />العودة للخريطة
          </Link>
          <div className="flex items-center gap-4">
            <div aria-hidden="true" className="flex size-[58px] shrink-0 items-center justify-center rounded-[16px] bg-[#CAF0F8] text-[32px]">{stage.icon}</div>
            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl">{stage.title}</h1>
              <p className="mt-1 text-xs leading-5 text-[#7C8599]">{stage.subtitle}</p>
            </div>
          </div>
          <div className="mt-1 sm:mr-[74px]">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-[#7C8599]">{stage.completedCount} من {stage.activities.length} أنشطة</span>
              <span dir="ltr" className="text-[#023E8A]">{percent}%</span>
            </div>
            <ProgressBar value={percent} label="تقدم المرحلة" />
          </div>
          <section aria-labelledby="stage-objectives" className="mt-3.5 rounded-[20px] border border-[#B7EEFC] bg-[#EAF9FD] px-4 py-3.5">
            <h2 id="stage-objectives" className="flex items-center gap-2 text-sm font-bold text-[#023E8A]"><Target size={15} aria-hidden="true" />أهداف المرحلة</h2>
            <ul className="mt-1.5 list-inside list-disc text-xs leading-[23px] text-[#648BC1] marker:text-[#00B4D8]">
              {stage.objectives.map(objective => <li key={objective}>{objective}</li>)}
            </ul>
          </section>
        </div>
      </header>
      <section aria-labelledby="stage-activities" className="min-h-[calc(100svh-320px)] bg-[#FAFBFC] px-4 py-8 sm:px-8">
        <div className={contentContainer}>
          <h2 id="stage-activities" className="mb-4 text-base font-extrabold">الأنشطة التعليمية</h2>
          <ol className="space-y-3">
            {stage.activities.map((activity, index) => {
              const Icon = activityIcons[activity.type]
              const locked = !activity.available && !activity.completed
              return (
                <li key={activity.type} aria-label={`${activity.title}، ${activity.completed ? 'مكتمل' : locked ? 'مقفل' : 'متاح'}`} className={`relative flex min-h-[74px] items-center gap-2 rounded-[16px] border px-3 py-3 sm:h-[74px] sm:gap-3.5 sm:px-4 ${locked ? 'border-[#E5E7EB]/70 bg-[#F9FAFB]' : 'border-[#E0E5EC] bg-white'}`}>
                  {activity.type === 'lesson' && activity.available && !locked && (
                    <Link to="/student/stages/1/lesson" aria-label={activity.title} className="absolute inset-0 z-10 rounded-[16px] hover:bg-[#023E8A]/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]" />
                  )}
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${locked ? 'bg-[#EBEDF0] text-[#AEB8C8]' : 'bg-[#023E8A] text-white'}`}>
                    {activity.completed ? <Check size={16} aria-hidden="true" /> : locked ? <LockKeyhole size={14} aria-hidden="true" /> : index + 1}
                  </span>
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full sm:size-11 ${locked ? 'bg-[#F3F4F6] text-[#5555A2]' : 'bg-[#CAF0F8] text-[#023E8A]'}`}><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-sm font-bold ${locked ? 'text-[#5555A2]' : 'text-[#03045E]'}`}>{activity.title}</h3>
                    <p className={`mt-0.5 text-xs leading-[18px] ${locked ? 'text-[#A1A7B5]' : 'text-[#7C8599]'}`}>{activity.description}</p>

                  </div>
                  <div className={`flex shrink-0 items-center ${locked ? 'flex-col gap-1' : 'flex-col gap-2 sm:flex-row sm:gap-4'}`}>
                    <span dir="ltr" className={`rounded-full px-2 py-0.5 text-[10px] leading-[14px] ${locked ? 'bg-[#F1F2F4] text-[#7C8599]' : 'bg-[#FFF3CD] text-[#A66B00]'}`}>+{activity.rewardXp} XP</span>
                    {locked ? <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] text-[#8991A4]">مقفل</span> : <ArrowLeft size={14} className="text-[#7C8599]" aria-hidden="true" />}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
    </>
  )
}
