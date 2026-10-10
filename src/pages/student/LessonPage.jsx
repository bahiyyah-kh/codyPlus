import { useState } from 'react'
import { ArrowRight, Play, SkipForward, Target, Video } from 'lucide-react'
import { Link, Navigate, useNavigate, useOutletContext } from 'react-router-dom'

const objectives = ['فهم بنية برنامج C++', 'استخدام cout للطباعة', 'تشغيل برنامجك الأول']
const explanations = [
  ['#include <iostream>', 'تتضمن مكتبة الإدخال والإخراج'],
  ['using namespace std', 'تتيح استخدام cout مباشرة'],
  ['int main()', 'نقطة البداية لكل برنامج C++'],
  ['cout', 'تستخدم لطباعة النصوص على الشاشة'],
  ['endl', 'ينقل المؤشر للسطر التالي'],
  ['return 0', 'يعني أن البرنامج انتهى بنجاح'],
]

export default function LessonPage() {
  const { journey, completeFirstLesson } = useOutletContext()
  const navigate = useNavigate()
  const [playRequested, setPlayRequested] = useState(false)
  const stage = journey.stages.find(item => item.id === 1)
  const lesson = stage?.activities.find(activity => activity.type === 'lesson')

  if (!stage?.unlocked || !lesson?.available) return <Navigate to="/student/stages/1" replace />

  return (
    <div className="px-4 py-6 sm:px-8 sm:pb-14">
      <div className="mx-auto w-full max-w-[720px]">
        <header>
          <Link to="/student/stages/1" className="inline-flex items-center gap-2 rounded text-sm text-[#7C8599] hover:text-[#023E8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">
            <ArrowRight size={16} aria-hidden="true" />العودة للمرحلة
          </Link>
          <div className="mt-5 flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-[16px] bg-[#CAF0F8] text-[#023E8A]" aria-hidden="true"><Video size={28} strokeWidth={1.8} /></div>
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[#CAF0F8] px-3 py-0.5 text-xs font-medium text-[#023E8A]">درس تعليمي</span>
              <h1 className="mt-2 text-2xl font-extrabold leading-9">مقدمة إلى <bdi dir="ltr">C++</bdi></h1>
              <p className="mt-1 text-sm leading-6 text-[#7C8599]">في هذا الدرس ستتعلم أساسيات لغة <bdi dir="ltr">C++</bdi> وكيفية كتابة برنامجك الأول.</p>
            </div>
          </div>
        </header>

        <section aria-labelledby="lesson-objectives" className="mt-6 rounded-[16px] border-r-4 border-[#00B4D8] bg-white p-4 shadow-[0_2px_14px_rgba(3,4,94,0.06)]">
          <h2 id="lesson-objectives" className="flex items-center gap-2 text-sm font-bold text-[#023E8A]"><Target size={17} aria-hidden="true" />ما ستتعلمه</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {objectives.map(objective => <li key={objective} className="rounded-full bg-[#00B4D8] px-3 py-1 text-xs font-bold leading-5 text-white">{objective}</li>)}
          </ul>
        </section>

        <section aria-label="العرض التعليمي" className="relative mt-6 flex aspect-video min-h-[280px] flex-col items-center justify-center rounded-[16px] bg-linear-to-tr from-[#023E8A] to-[#03045E] px-4 py-16 text-center shadow-sm sm:min-h-0">
          <span className="absolute top-3 right-3 rounded-full bg-[#FFB323] px-3 py-1 text-xs font-bold text-[#03045E]">عرض تعليمي تفاعلي</span>
          <button type="button" onClick={() => setPlayRequested(true)} aria-label="انقر لبدء الدرس" aria-describedby="presentation-unavailable" className="flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-20"><Play size={36} strokeWidth={1.8} aria-hidden="true" /></button>
          <p className="mt-4 text-sm text-[#CAF0F8]">انقر لبدء الدرس</p>
          <p className="mt-1 text-xs text-[#B7C8E5]">(عرض توضيحي تفاعلي)</p>
          <p id="presentation-unavailable" className="mt-3 text-sm font-medium text-white">المحتوى التعليمي غير متاح حاليًا</p>
          <p role="status" className="mt-1 text-xs text-[#CAF0F8]">{playRequested ? 'لا يوجد عرض متاح للتشغيل. يمكنك قراءة شرح الكود أدناه.' : ''}</p>
        </section>

        <section aria-labelledby="code-explanation" className="mt-6 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_14px_rgba(3,4,94,0.06)]">
          <h2 id="code-explanation" className="border-b border-[#E5E7EB] px-5 py-4 text-base font-bold">شرح الكود</h2>
          <dl className="space-y-3 p-4 sm:p-5">
            {explanations.map(([code, explanation]) => (
              <div key={code} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="max-w-full"><code dir="ltr" className="inline-block max-w-full rounded bg-[#CAF0F8] px-2 py-0.5 font-mono text-xs leading-5 break-words text-[#008CAA]">{code}</code></dt>
                <dd className="min-w-0 text-sm leading-6 text-[#6480A5]">{explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => {
            completeFirstLesson()
            navigate('/student/stages/1')
          }} className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-[24px] bg-[#FFB323] px-7 py-3 text-lg font-medium text-[#03045E] hover:bg-[#FFA90A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">
            <SkipForward size={20} aria-hidden="true" />تخطى وأكمل الدرس
          </button>
        </div>
      </div>
    </div>
  )
}
