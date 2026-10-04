import { Link } from 'react-router-dom'
import logo from '../assets/Codypluslogo.png'
import { login, saveSession } from '../auth/loginApi.js'
import useRecoveryRequest from '../auth/useRecoveryRequest.js'

export default function LoginPage({ onBackHome, onForgotPassword, onLoginSuccess }) {
  const { pending, error, run } = useRecoveryRequest()
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    const email = fields.get('email').trim()
    const password = fields.get('password')
    run(signal => login(email, password, signal), session => {
      saveSession(session)
      form.reset()
      onLoginSuccess?.(session)
    })
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-gradient-to-bl from-[#CAF0F8]/40 via-[#FAFBFC] to-[#FAFBFC]">
      <header className="flex h-14 shrink-0 items-center border-b border-[#E5E7EB] bg-white/80 px-5 sm:px-6">
        <button
          type="button"
          onClick={onBackHome}
          aria-label="العودة إلى الصفحة الرئيسية"
          className="rounded transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]"
        >
          <img src={logo} alt="Cody+" className="h-8 w-auto object-contain" />
        </button>
      </header>

      <main className="flex flex-1 justify-center px-4 py-9 sm:py-10">
        <div className="w-full max-w-[404px]">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#023E8A] text-white">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-[#03045E]">مرحباً بعودتك!</h1>
            <p className="mt-2 text-sm text-[#6B7280]">سجّل دخولك للوصول إلى رحلتك التعليمية</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_14px_rgba(3,4,94,0.07)] sm:p-7">
            <form onSubmit={handleSubmit} aria-busy={pending} className="flex flex-col gap-5">
              {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#03045E]">البريد الإلكتروني</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 6 9 7 9-7" />
                  </svg>
                  <input id="email" name="email" type="email" dir="ltr" autoComplete="username" required placeholder="example@email.com" className="w-full rounded-full border border-[#E5E7EB] bg-white py-3 pl-4 pr-9 text-right text-sm text-[#03045E] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#03045E]">كلمة المرور</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V6a4 4 0 0 1 8 0v4" />
                  </svg>
                  <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="أدخل كلمة المرور" className="w-full rounded-full border border-[#E5E7EB] bg-white py-3 pl-4 pr-9 text-sm text-[#03045E] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20" />
                </div>
                <div className="mt-2">
                  <button type="button" onClick={onForgotPassword} className="rounded text-xs text-[#023E8A] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]">نسيت كلمة المرور؟</button>
                </div>
              </div>

              <button type="submit" disabled={pending} className="w-full rounded-[22px] bg-[#023E8A] py-3 text-base font-bold text-white transition-colors hover:bg-[#03045E] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">{pending ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}</button>
            </form>

            <p className="mt-5 text-center text-sm text-[#6B7280]">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="font-semibold text-[#03045E] hover:text-[#03045E]">سجّل الآن مجاناً</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
