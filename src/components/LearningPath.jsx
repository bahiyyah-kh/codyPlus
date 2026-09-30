import { BsRocketTakeoffFill } from 'react-icons/bs'
import { FaBox, FaCodeBranch } from 'react-icons/fa6'
import { FaBoxes, FaSync } from 'react-icons/fa'

const stages = [
  {
    title: 'المقدمة',
    description: 'أساسيات البرمجة',
    Icon: BsRocketTakeoffFill,
  },
  {
    title: 'المتغيرات',
    description: 'تخزين البيانات',
    Icon: FaBox,
  },
  {
    title: 'الشروط',
    description: 'اتخاذ القرارات',
    Icon: FaCodeBranch,
  },
  {
    title: 'الحلقات',
    description: 'التكرار الفعّال',
    Icon: FaSync,
  },
  {
    title: 'المصفوفات',
    description: 'تنظيم البيانات',
    Icon: FaBoxes,
  },
]

function LearningPath({ onStartLearning }) {
  return (
    <section aria-labelledby="learning-path-heading" dir="rtl" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2
            id="learning-path-heading"
            className="mb-3 text-3xl font-black text-[#03045E]"
          >
            رحلتك التعليمية
          </h2>
          <p className="text-[#6B7280]">
            خمس مراحل متكاملة تأخذك من المبتدئ إلى المحترف
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {stages.map(({ title, description, Icon }, index) => (
            <div key={title} className="flex items-center gap-3">
              <article className="w-36 rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-lg">
                <Icon
                  aria-hidden="true"
                  className="mx-auto mb-3 h-9 w-9 text-[#00B4D8]"
                />
                <h3 className="text-sm font-bold text-[#03045E]">{title}</h3>
                <p className="mt-1 text-xs text-[#6B7280]">{description}</p>
              </article>

              {index < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-[#03045E] sm:block"
                >
                  ←
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-[#6B7280]">
            كل مرحلة تتضمن: درس + أحجية + لعبة + تحدي برمجي + اختبار
          </p>
          <button
            type="button"
            onClick={onStartLearning}
            className="rounded-lg bg-[#03045E] px-6 py-3 font-bold text-white transition-colors hover:bg-[#009DBD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03045E]"
          >
            ابدأ التعلم الآن
          </button>
        </div>
      </div>
    </section>
  )
}

export default LearningPath
