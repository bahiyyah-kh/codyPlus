import { User, Star } from 'lucide-react'

const testimonials = [
  {
    name: ' كريم جلاد',
    age: 15,
    text: 'كودي+ غيّر نظرتي للبرمجة! الألعاب والأحاجي جعلت تعلم C++ ممتعاً جداً.',
    xp: 1250,
  },
  {
    name: 'سارة ياسين',
    age: 14,
    text: 'أفضل منصة تعليمية جربتها. الدروس واضحة والمساعد الذكي رائع!',
    xp: 1100,
  },
  {
    name: 'أحمد خضر',
    age: 16,
    text: 'حصلت على شهادتي خلال شهرين فقط. شكراً كودي+!',
    xp: 980,
  },
]

export default function TestimonialsSection() {
  return (
    <section
      lang="ar"
      dir="rtl"
      aria-labelledby="testimonials-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <h2
          id="testimonials-heading"
          className="mb-10 text-center text-3xl leading-tight font-black text-[#03045E] sm:mb-14 sm:text-4xl"
        >
          ماذا يقول طلابنا؟
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-w-0 flex-col rounded-[22px] bg-white p-6 text-right shadow-[0_4px_20px_rgba(3,4,94,0.07)] sm:p-[30px] lg:min-h-[220px]"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-[#CAF0F8] text-[#03045E]">
                  <User
                    aria-hidden="true"
                    focusable="false"
                    size={24}
                    strokeWidth={2}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#03045E]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">
                    عمر {testimonial.age} سنة •{' '}
                    <bdi dir="ltr" className="whitespace-nowrap">
                      {testimonial.xp} XP
                    </bdi>
                  </p>
                </div>
              </div>

              <blockquote className="mb-4 text-base leading-7 text-[#374151]">
                <p>
                  &quot;
                  {testimonial.text.split(/(C\+\+)/).map((part, index) =>
                    part === 'C++' ? <bdi key={index} dir="ltr">C++</bdi> : part,
                  )}
                  &quot;
                </p>
              </blockquote>

              <div aria-hidden="true" className="mt-auto flex gap-1 text-[#FFC400]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    focusable="false"
                    size={16}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
