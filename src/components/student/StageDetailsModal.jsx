import { useEffect, useId, useRef } from 'react'
import { Check, ClipboardList, Code2, Gamepad2, LockKeyhole, Play, Puzzle, Video, X } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

const activityIcons = { lesson: Video, puzzle: Puzzle, game: Gamepad2, challenge: Code2, quiz: ClipboardList }

export default function StageDetailsModal({ stage, onClose, onStart }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const completedCount = stage.activities.filter(activity => activity.completed).length
  const percent = stage.activities.length ? Math.round(completedCount / stage.activities.length * 100) : 0

  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      lang="ar"
      dir="rtl"
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-4 font-sans text-[#03045E] open:flex backdrop:bg-[#03045E]/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E5E7EB] px-5 py-5 sm:px-8 sm:py-6">
          <h2 id={titleId} className="text-xl font-extrabold sm:text-2xl">{stage.title}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label="إغلاق تفاصيل المرحلة" className="shrink-0 cursor-pointer rounded-lg p-2 text-[#7C8599] hover:bg-[#FAFBFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]">
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 overflow-y-auto overscroll-contain p-5 text-right sm:p-8">
          <div aria-hidden="true" className="flex size-20 items-center justify-center rounded-[22px] bg-[#CAF0F8] text-[40px]">{stage.icon}</div>
          <p className="mt-5 text-base leading-7 text-[#7C8599] sm:text-lg">{stage.description}</p>

          <ul aria-label="أنشطة المرحلة" className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
            {stage.activities.map(activity => {
              const Icon = activityIcons[activity.type]
              const highlighted = activity.available && !activity.completed
              return (
                <li key={activity.type} className={`flex min-w-0 items-center gap-2 rounded-[28px] border px-3 py-4 sm:gap-3 sm:px-4 ${highlighted ? 'border-[#CAF0F8] bg-[#EFFAFF] text-[#023E8A]' : 'border-[#E5E7EB]/70 bg-white text-[#7779AA]'}`}>
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" className={`shrink-0 ${highlighted ? '' : 'text-[#648BC1]'}`} />
                  <div className="min-w-0">
                    <p className="text-sm leading-5 sm:text-base">{activity.label}</p>
                    <div className="mt-1 flex min-h-4 items-center gap-1 text-xs text-[#8991A4]">
                      {activity.completed ? (
                        <><Check size={14} aria-hidden="true" /><span>مكتمل</span></>
                      ) : activity.available ? (
                        <>{activity.rewardXp == null && <span>متاح</span>}</>
                      ) : (
                        <><LockKeyhole size={14} aria-hidden="true" /><span className="sr-only">مقفل</span></>
                      )}
                      {activity.rewardXp != null && <span dir="ltr" className="inline-block">+{activity.rewardXp} XP</span>}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm"><span className="text-[#7C8599]">تقدم المرحلة</span><span dir="ltr" className="text-[#023E8A]">{percent}%</span></div>
            <ProgressBar value={percent} label="تقدم المرحلة" />
          </div>
          <button type="button" disabled={!onStart} onClick={onStart} className="mt-7 flex min-h-[64px] w-full cursor-pointer items-center justify-center gap-3 rounded-[28px] bg-[#023E8A] px-4 py-4 text-xl font-bold text-white hover:bg-[#03045E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A] disabled:cursor-not-allowed">
            <Play size={21} strokeWidth={1.8} aria-hidden="true" />ابدأ المرحلة
          </button>
        </div>
      </div>
    </dialog>
  )
}
