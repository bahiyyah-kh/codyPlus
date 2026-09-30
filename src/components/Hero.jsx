import CodyMascot from '../assets/cody-mascot.png'

const statistics = [
  ['500+', 'طالب مسجّل'],
  ['5', 'مراحل تعليمية'],
  ['25+', 'تحدي برمجي'],
  ['100%', 'مجاني تماماً'],
]

function Hero({ onStartJourney, onFreeLesson }) {
  return (
    <section
      aria-labelledby="hero-heading"
      dir="rtl"
      className="relative overflow-hidden bg-[#FAFBFC]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-bl from-[#CAF0F8]/60 via-[#FAFBFC] to-[#FAFBFC]"
      />
      <div
        aria-hidden="true"
        className="absolute left-8 top-20 h-72 w-72 rounded-full bg-[#00B4D8]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-[#023E8A]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12 xl:gap-16">
          <div className="flex-1 text-center lg:text-right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#00B4D8] px-4 py-1.5 text-sm font-medium text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M14.5 5.5c2.1-2.1 4.6-2.4 6-2-0.4 1.4-.1 3.9-2.2 6L12 15.8l-3.8-3.8 6.3-6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="m8.2 12-3.5.6-2.2 2.2 5 .7m4.3 0-.6 3.5L9 21l-.7-5M6.4 18.4c-1.1.1-1.8.5-2.4 1.2-.6.7-.8 1.5-.8 2.2.7 0 1.5-.2 2.2-.8.7-.6 1.1-1.3 1-2.6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              منصة تعليمية عربية لتعلم C++
            </div>

            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-black leading-tight text-[#03045E] sm:text-5xl md:text-6xl"
            >
              تعلّم البرمجة
              <br />
              <span className="text-[#00B4D8]">بطريقة ممتعة</span>
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#374151] sm:text-xl lg:mx-0">
              رحلة تعليمية تفاعلية تعلّمك C++ من الصفر إلى الاحتراف — ألعاب، أحاجي، تحديات برمجية، ومكافآت تحفّزك على التقدم.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={onStartJourney}
                className="rounded-full bg-[#FFB323] px-8 py-3 text-base font-medium text-[#023E8A] transition-colors hover:bg-[#F5A914] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]"
              >
                ابدأ رحلتك
              </button>
              <button
                type="button"
                onClick={onFreeLesson}
                className="rounded-full border border-[#023E8A] bg-transparent px-8 py-3 text-base font-medium text-[#023E8A] transition-colors hover:bg-[#CAF0F8]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]"
              >
                جرّب درس مجاني
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-5 text-center sm:mt-14 sm:gap-x-8 lg:justify-start">
              {statistics.map(([value, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-[#023E8A] sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1 text-sm text-[#6B7280]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex w-[276px] flex-shrink-0 items-center justify-center sm:w-[356px] lg:-mr-12 lg:w-[465px] xl:-mr-14 xl:w-[510px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-6 select-none font-mono text-xl font-bold text-[#00B4D8]/25"
            >
              &lt;/&gt;
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 left-0 select-none font-mono text-lg font-bold text-[#023E8A]/20"
            >
              {'{ }'}
            </span>
            <img
              src={CodyMascot}
              alt="تميمة Cody+، روبوت تعليمي يلوّح بيده"
              className="w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
