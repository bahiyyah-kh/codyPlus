import CodyPlusLogo from '../assets/Codypluslogo.png'

function Navbar({ onLogin, onRegister }) {
  return (
    <nav
      aria-label="التنقل الرئيسي"
      dir="rtl"
      className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-2 min-[431px]:px-3 sm:h-[76px] sm:px-4" dir="ltr">
        <div className="flex items-center gap-1 min-[371px]:gap-2 min-[431px]:gap-3">
          <button
            type="button"
            onClick={onRegister}
            className="rounded-full bg-[#FFAD24] px-2 py-2 text-xs font-medium text-[#173C71] transition-colors hover:bg-[#F7A318] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173C71] min-[371px]:px-3 min-[431px]:px-5 sm:text-sm"
          >
            إنشاء حساب
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="rounded-full px-2 py-2 text-xs font-medium text-[#174985] transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173C71] min-[371px]:px-3 min-[431px]:px-5 sm:text-sm"
          >
            تسجيل الدخول
          </button>
        </div>

        <img
          src={CodyPlusLogo}
          alt="Cody+"
          className="h-7 w-auto object-contain min-[360px]:h-10 sm:h-[46px]"
        />
      </div>
    </nav>
  )
}

export default Navbar
