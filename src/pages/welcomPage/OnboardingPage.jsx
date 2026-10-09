import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import journeySrc from '../../assets/welcomRopot/الرحلة .png'
import activitiesSrc from '../../assets/welcomRopot/أنشطة_ممتعة.png'
import experienceSrc from '../../assets/welcomRopot/اكسب_نقاط.png'
import certificateSrc from '../../assets/welcomRopot/الشهادة في انتظارك.png'

const steps = [
  {
    image: journeySrc,
    imageAlt: 'كودي يحمل جهازاً لوحياً',
    title: 'رحلتك التعليمية',
    description: <>ستتعلم <bdi dir="ltr">C++</bdi> عبر 5 مراحل متتالية — كل مرحلة مبنية على السابقة وتحتوي على أنشطة متنوعة.</>,
  },
  {
    image: activitiesSrc,
    imageAlt: 'كودي يفكر مع فقاعة علامة استفهام',
    title: 'أنشطة ممتعة',
    description: 'كل مرحلة تتضمن: درس تعليمي، أحجية برمجية، لعبة تعليمية، تحدي كود، واختبار نهائي.',
  },
  {
    image: experienceSrc,
    imageAlt: 'كودي يحتفل بكسب نقاط الخبرة',
    title: 'اكسب نقاط الخبرة',
    description: <>عند إكمال كل نشاط ستحصل على نقاط <bdi dir="ltr">XP</bdi>، وشارات الإنجاز، ومكانة في قائمة المتصدرين.</>,
  },
  {
    image: certificateSrc,
    imageAlt: 'كودي يحمل شهادة الإتمام',
    title: 'الشهادة في انتظارك',
    description: <>أكمل جميع المراحل واجتز الاختبار النهائي للحصول على شهادة إتمام <bdi dir="rtl" className="whitespace-nowrap">كودي+</bdi>.</>,
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const step = steps[stepIndex]
  const isFinalStep = stepIndex === steps.length - 1

  return (
    <main
      lang="ar"
      dir="rtl"
      className="flex min-h-svh items-center justify-center bg-[#fafbfc] bg-[radial-gradient(ellipse_at_top_right,#eaf8fb_0%,transparent_65%)] px-6 py-6 font-sans text-[#03045E] sm:pt-16"
    >
      <div className="flex w-full max-w-[540px] flex-col items-center text-center">
        <img
          src={step.image}
          alt={step.imageAlt}
          className="h-auto w-[240px] max-w-full object-contain sm:w-[270px]"
        />

        <h1 className="mt-6 text-3xl leading-[42px] font-extrabold sm:mt-8 sm:text-[32px]">
          {step.title}
        </h1>
        <p className="mt-3 text-lg leading-8 text-[#4b5563] sm:text-xl">
          {step.description}
        </p>

        <div role="img" aria-label={`الخطوة ${stepIndex + 1} من أربع خطوات`} className="mt-7 flex items-center gap-[10px]">
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className={`h-3 rounded-full ${index === stepIndex ? 'w-10 bg-[#023E8A]' : index < stepIndex ? 'w-3 bg-[#00B4D8]' : 'w-3 bg-[#e5e7eb]'}`} />
          ))}
        </div>

        <div className={`mt-[30px] flex max-w-full items-center ${isFinalStep ? 'gap-3 sm:gap-4' : 'gap-4'}`}>
          {stepIndex > 0 && (
            <button type="button" onClick={() => setStepIndex((index) => index - 1)} className={`${isFinalStep ? 'h-[70px] min-w-[88px] px-4 sm:min-w-[112px] sm:px-6' : 'h-14 min-w-[112px] px-6'} cursor-pointer rounded-full border border-[#023E8A] bg-transparent text-xl text-[#023E8A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]`}>
              السابق
            </button>
          )}
          {isFinalStep ? (
            <button type="button" onClick={() => navigate('/student')} className="flex h-[70px] w-[160px] cursor-pointer items-center justify-center gap-2 rounded-[30px] bg-[#FFB323] px-3 text-xl font-medium text-[#03045E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A] sm:w-[198px] sm:gap-3">
              <span>ابدأ الرحلة!</span>
              <Rocket size={22} className="shrink-0" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={() => setStepIndex((index) => Math.min(index + 1, steps.length - 1))} className="h-14 min-w-[94px] cursor-pointer rounded-full bg-[#023E8A] px-6 text-xl font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">
              التالي
            </button>
          )}
        </div>
        {/* Skip stays disabled until its destination is implemented. */}
        {!isFinalStep && (
          <button type="button" disabled className="mt-4 cursor-not-allowed text-base leading-6 text-[#6b7280]">
            تخطى
          </button>
        )}
      </div>
    </main>
  )
}
