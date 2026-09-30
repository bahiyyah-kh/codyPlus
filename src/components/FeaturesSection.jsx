import { Gamepad2, Bot, Trophy, BarChart3, Code2, Scroll } from 'lucide-react'

const features = [
  {
    titleAr: 'تعلم تفاعلي',
    descAr: 'ألعاب وأحاجي ممتعة تجعل تعلم C++ مغامرة لا تُنسى',
    icon: Gamepad2,
  },
  {
    titleAr: 'مساعد ذكي',
    descAr: 'احصل على تلميحات ذكية تساعدك على حل التحديات دون أن تكشف الإجابة',
    icon: Bot,
  },
  {
    titleAr: 'نظام مكافآت',
    descAr: 'اكسب نقاط الخبرة والشارات وتسلق قائمة المتصدرين',
    icon: Trophy,
  },
  {
    titleAr: 'تتبع التقدم',
    descAr: 'راقب رحلتك التعليمية وشاهد تقدمك في كل مرحلة',
    icon: BarChart3,
  },
  {
    titleAr: 'محرر كود حقيقي',
    descAr: 'اكتب وجرّب كود C++ مباشرة في المتصفح',
    icon: Code2,
  },
  {
    titleAr: 'شهادة إتمام',
    descAr: 'احصل على شهادة إتمام معتمدة عند اجتياز جميع المراحل',
    icon: Scroll,
  },
]

export default function FeaturesSection() {
  return (
    <section
      lang="ar"
      dir="rtl"
      aria-labelledby="features-heading"
      className="bg-[#FAFBFC] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[30px]">
        <div className="mb-10 text-center sm:mb-14 lg:mb-[60px]">
          <h2
            id="features-heading"
            className="mb-3 text-3xl leading-tight font-black text-[#03045E] sm:text-4xl"
          >
            لماذا كودي+؟
          </h2>
          <p className="text-base leading-relaxed text-[#6B7280] sm:text-lg">
            تجربة تعليمية فريدة صُممت خصيصاً للطلاب العرب
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
          {features.map((feature) => (
            <article
              key={feature.titleAr}
              className="min-w-0 rounded-[22px] bg-white p-6 text-right shadow-[0_4px_20px_rgba(3,4,94,0.07)] transition-shadow hover:shadow-lg sm:p-[30px] lg:min-h-[237px]"
            >
              <div className="mb-6 flex size-[60px] items-center justify-center rounded-full bg-[#CAF0F8] text-[#03045E]">
                <feature.icon
                  aria-hidden="true"
                  focusable="false"
                  size={30}
                  strokeWidth={2}
                />
              </div>
              <h3 className="mb-2 text-xl leading-7 font-bold text-[#03045E]">
                {feature.titleAr}
              </h3>
              <p className="text-base leading-7 wrap-break-word text-[#6B7280]">
                {feature.descAr.split(/(C\+\+)/).map((part, index) =>
                  part === 'C++' ? (
                    <bdi key={index} dir="ltr" className="whitespace-nowrap">
                      C++
                    </bdi>
                  ) : part,
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
