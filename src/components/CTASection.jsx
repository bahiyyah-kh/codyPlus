import { PartyPopper } from 'lucide-react'

export default function CTASection({ onRegister, onLogin }) {
  return (
    <section
      lang="ar"
      dir="rtl"
      aria-labelledby="cta-heading"
      className="flex min-h-[452px] items-center bg-linear-to-bl from-[#023E8A] to-[#03045E] px-4 py-20 text-center text-white sm:py-24"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2
          id="cta-heading"
          className="mb-4 text-3xl leading-tight font-black sm:text-5xl"
        >
          جاهز لتبدأ رحلتك؟
        </h2>

        <p className="mb-9 text-lg leading-relaxed text-[#CAF0F8] sm:text-2xl">
          انضم إلى مئات الطلاب الذين بدأوا رحلتهم في عالم البرمجة مع كودي+
        </p>

        <div className="flex flex-col items-stretch justify-center gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onRegister}
            className="inline-flex min-h-[70px] items-center justify-center gap-3 rounded-[30px] bg-[#FFB323] px-9 py-4 text-xl font-medium text-[#03045E] transition-colors hover:bg-[#FFC247] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[275px] sm:text-2xl"
          >
            <span>سجّل الآن — مجاناً!</span>
            <PartyPopper
              aria-hidden="true"
              focusable="false"
              size={22}
              strokeWidth={1.7}
              className="shrink-0"
            />
          </button>

          <button
            type="button"
            onClick={onLogin}
            className="min-h-[70px] rounded-[30px] border border-white/30 bg-transparent px-9 py-4 text-xl font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[197px]"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </section>
  )
}
