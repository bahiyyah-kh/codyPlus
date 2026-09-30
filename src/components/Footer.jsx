import codyPlusLogo from '../assets/Codypluslogo.png'

export default function Footer() {
  return (
    <footer
      lang="ar"
      dir="rtl"
      className="bg-[#03045E] py-[38px] text-center text-sm text-white/60"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center justify-items-center gap-6 px-6 md:grid-cols-3 md:gap-4">
        <div className="flex h-14 w-[150px] items-center justify-center rounded-full bg-white md:justify-self-start">
          <img
            src={codyPlusLogo}
            alt="كودي+"
            width="2172"
            height="724"
            className="h-auto w-[120px]"
          />
        </div>

        <p className="leading-relaxed sm:text-base">
          © 2027 كودي+ — منصة تعليم <bdi dir="ltr">C++</bdi> بالعربي
        </p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/40 md:justify-self-end">
          <span>سياسة الخصوصية</span>
          <span>شروط الاستخدام</span>
        </div>
      </div>
    </footer>
  )
}
