import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { maskEmail, useRecovery } from '../auth/RecoveryContext.js'
import { sendResetCode } from '../auth/recoveryApi.js'
import useRecoveryRequest from '../auth/useRecoveryRequest.js'
import RecoveryLayout from '../components/auth/RecoveryLayout.jsx'
import RecoveryButton from '../components/auth/RecoveryButton.jsx'
import RecoveryError from '../components/auth/RecoveryError.jsx'

export default function RecoveryMethodPage() {
  const { recovery, setRecovery, clearRecovery } = useRecovery()
  const [support, setSupport] = useState(false)
  const { pending, error, run } = useRecoveryRequest()
  const navigate = useNavigate()
  const masked = maskEmail(recovery.email)
  const changeAccount = () => { clearRecovery(); navigate('/forgot-password') }
  function submit(event) {
    event.preventDefault()
    run(signal => sendResetCode(recovery.email, signal), () => {
      setRecovery(previous => ({ ...previous, codeSent: true, resetToken: '', expiresAt: '', complete: false, resendAt: Date.now() + 60000 }))
      navigate('/forgot-password/verify-code')
    })
  }
  return <RecoveryLayout backTo="/forgot-password" onBack={clearRecovery} step={2}>
    <h1 className="mb-6 text-xl font-black">طريقة استعادة الحساب</h1>
    <div className="mb-5 flex items-center gap-3 rounded-[22px] border border-[#CAF0F8] bg-[#EFF9FD] p-3.5">
      <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#023E8A] text-xl">🎓</div>
      <div className="min-w-0 flex-1"><p className="text-sm font-bold">طالب cody+</p><p dir="ltr" className="mt-0.5 wrap-break-word text-xs text-[#6B7280]">{masked}</p></div>
    </div>
    <form onSubmit={submit}>
      <label className="mb-4 flex items-center gap-3 rounded-[22px] border border-[#E5E7EB] bg-[#EFF9FD] px-4 py-3.5">
        <input type="radio" name="recovery" value="email" checked readOnly className="size-4 shrink-0 accent-[#023E8A]" />
        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">الحصول على الرمز عبر البريد الإلكتروني</span><span dir="ltr" className="mt-0.5 block wrap-break-word text-xs text-[#6B7280]">{masked}</span></span>
        <Mail size={17} className="shrink-0 text-[#023E8A]" aria-hidden="true" />
      </label>
      <div className="mb-5 flex justify-end"><button type="button" onClick={() => setSupport(value => !value)} aria-expanded={support} className="rounded text-xs font-medium text-[#023E8A] hover:underline focus-visible:outline-2">لم يعد بإمكانك الوصول إليها؟</button></div>
      {support && <p role="status" className="mb-4 text-xs leading-relaxed text-[#6B7280]">تتطلب استعادة الحساب الوصول إلى هذا البريد الإلكتروني. حاول استعادة الوصول إليه عبر مزود البريد، أو أدخل بريد حساب آخر باستخدام «ألست أنت؟».</p>}
      <RecoveryError message={error} />
      <div className="flex flex-col gap-3"><RecoveryButton type="submit" disabled={pending}>{pending ? 'جارٍ إرسال الرمز…' : 'متابعة'}</RecoveryButton><RecoveryButton variant="secondary" onClick={changeAccount}>ألست أنت؟</RecoveryButton></div>
    </form>
  </RecoveryLayout>
}
