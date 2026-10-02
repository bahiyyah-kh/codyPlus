import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { maskEmail, useRecovery } from '../auth/RecoveryContext.js'
import { resendResetCode, verifyResetCode } from '../auth/recoveryApi.js'
import useRecoveryRequest from '../auth/useRecoveryRequest.js'
import RecoveryLayout from '../components/auth/RecoveryLayout.jsx'
import RecoveryButton from '../components/auth/RecoveryButton.jsx'
import RecoveryError from '../components/auth/RecoveryError.jsx'
import OtpInput from '../components/auth/OtpInput.jsx'

export default function VerifyCodePage() {
  const { recovery, setRecovery } = useRecovery()
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [now, setNow] = useState(Date.now)
  const [toast, setToast] = useState(false)
  const { pending, error, setError, run } = useRecoveryRequest()
  const navigate = useNavigate()
  const remaining = Math.max(0, Math.ceil((recovery.resendAt - now) / 1000))
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer) }, [])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(false), 4000); return () => clearTimeout(timer) }, [toast])
  function submit(event) {
    event.preventDefault()
    const code = otp.join('')
    if (!/^\d{6}$/.test(code)) return
    run(async signal => {
      const result = await verifyResetCode(recovery.email, code, signal)
      if (typeof result?.resetToken !== 'string' || !result.resetToken || !Number.isFinite(Date.parse(result.expiresAt))) throw new Error('استجابة التحقق غير مكتملة. لم يتم استلام رمز إعادة تعيين صالح ووقت انتهاء صلاحيته.')
      if (Date.parse(result.expiresAt) <= Date.now()) throw new Error('انتهت صلاحية رمز إعادة التعيين. اطلب رمزاً جديداً.')
      return result
    }, result => {
      setOtp(Array(6).fill(''))
      setRecovery(previous => ({ ...previous, resetToken: result.resetToken, expiresAt: result.expiresAt, complete: false }))
      navigate('/forgot-password/reset-password')
    })
  }
  function resend() {
    if (remaining || pending) return
    run(signal => resendResetCode(recovery.email, signal), () => {
      setRecovery(previous => ({ ...previous, resetToken: '', expiresAt: '', resendAt: Date.now() + 60000 }))
      setOtp(Array(6).fill('')); setNow(Date.now()); setToast(true)
    }, failure => {
      if (failure.status === 429) setRecovery(previous => ({ ...previous, resendAt: Date.now() + failure.retryAfter * 1000 }))
    })
  }
  return <RecoveryLayout backTo="/forgot-password/recovery-method" onBack={() => setRecovery(previous => ({ ...previous, resetToken: '', expiresAt: '' }))} step={3}>
    {toast && <div role="status" className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg"><CheckCircle2 size={17} className="shrink-0" aria-hidden="true" />تم إرسال رمز جديد إلى بريدك الإلكتروني بنجاح</div>}
    <h1 className="mb-2 text-xl font-black">تأكيد حسابك</h1>
    <p className="mb-8 text-sm leading-relaxed text-[#6B7280]">لقد أرسلنا رمزاً إلى بريدك الإلكتروني. يرجى إدخال هذا الرمز لتأكيد حسابك.<span dir="ltr" className="mt-1 block wrap-break-word">{maskEmail(recovery.email)}</span></p>
    <form onSubmit={submit}>
      <OtpInput value={otp} onChange={value => { setOtp(value); setError('') }} disabled={pending} invalid={!!error} />
      <div className="mb-6 text-center">{remaining ? <p role="status" className="text-xs text-[#6B7280]">يمكنك إعادة إرسال الرمز خلال <bdi dir="ltr" className="font-bold text-[#023E8A]">{String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}</bdi></p> : <button type="button" disabled={pending} onClick={resend} className="rounded text-sm font-semibold text-[#023E8A] hover:underline focus-visible:outline-2 disabled:opacity-40">{otp.some(Boolean) ? 'إعادة إرسال الرمز' : 'ألم تتلق رمزاً؟'}</button>}</div>
      <RecoveryError id="otp-error" message={error} />
      <RecoveryButton type="submit" disabled={pending || otp.some(digit => !digit)}>{pending ? 'جارٍ معالجة الطلب…' : 'متابعة'}</RecoveryButton>
    </form>
  </RecoveryLayout>
}
