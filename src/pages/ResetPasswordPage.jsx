import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { emptyRecovery, useRecovery } from '../auth/RecoveryContext.js'
import { resetPassword } from '../auth/recoveryApi.js'
import useRecoveryRequest from '../auth/useRecoveryRequest.js'
import RecoveryLayout from '../components/auth/RecoveryLayout.jsx'
import RecoveryButton from '../components/auth/RecoveryButton.jsx'
import RecoveryError from '../components/auth/RecoveryError.jsx'

export default function ResetPasswordPage() {
  const { recovery, setRecovery, clearRecovery } = useRecovery()
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const { pending, error, setError, run } = useRecoveryRequest()
  const navigate = useNavigate()
  const valid = password.length >= 6 && /\p{L}/u.test(password) && /[0-9٠-٩۰-۹]/.test(password)
  const strength = valid ? (password.length >= 9 ? 3 : 2) : 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecovery(previous => ({ ...previous, resetToken: '', expiresAt: '' }))
      navigate('/forgot-password/verify-code', { replace: true })
    }, Math.min(2147483647, Math.max(0, Date.parse(recovery.expiresAt) - Date.now())))
    return () => clearTimeout(timer)
  }, [recovery.expiresAt, navigate, setRecovery])
  function submit(event) {
    event.preventDefault()
    if (!valid) { setError('استخدم ما لا يقل عن 6 أحرف تحتوي على أحرف وأرقام.'); return }
    if (Date.parse(recovery.expiresAt) <= Date.now()) { setError('انتهت صلاحية رمز إعادة التعيين. ارجع واطلب رمزاً جديداً.'); return }
    run(signal => resetPassword(recovery.resetToken, password, signal), () => {
      setPassword('')
      setRecovery({ ...emptyRecovery, complete: true })
      navigate('/forgot-password/success', { replace: true })
    })
  }
  return <RecoveryLayout backTo="/forgot-password/verify-code" onBack={() => setRecovery(previous => ({ ...previous, resetToken: '', expiresAt: '' }))} step={4}>
    <h1 className="mb-2 text-xl font-black">إنشاء كلمة سر جديدة</h1>
    <p id="password-policy" className="mb-6 text-sm leading-relaxed text-[#6B7280]">ستستخدم كلمة السر هذه لتسجيل الدخول إلى حسابك. استخدم ما لا يقل عن 6 أحرف وأرقام.</p>
    <form onSubmit={submit} noValidate>
      <label htmlFor="new-password" className="mb-1.5 block text-sm font-semibold text-[#374151]">كلمة السر الجديدة</label>
      <div className="relative">
        <input id="new-password" autoComplete="new-password" required type={visible ? 'text' : 'password'} value={password} disabled={pending} onChange={event => { setPassword(event.target.value); setError('') }} aria-describedby={`password-policy${error ? ' password-error' : ''}`} aria-invalid={!!error} placeholder="أدخل كلمة السر الجديدة" className="h-12 w-full rounded-full border border-[#E5E7EB] pr-4 pl-11 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#023E8A] focus:ring-2 focus:ring-[#00B4D8]/30" />
        <button type="button" aria-label={visible ? 'إخفاء كلمة السر' : 'إظهار كلمة السر'} aria-pressed={visible} onClick={() => setVisible(value => !value)} className="absolute top-1/2 left-3.5 -translate-y-1/2 rounded text-[#6B7280] focus-visible:outline-2">{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>
      </div>
      {password && <div role="status" aria-label={`قوة كلمة السر: ${strength === 3 ? 'قوية' : strength === 2 ? 'متوسطة' : 'ضعيفة'}`} className="mt-2 flex gap-1.5">{[1, 2, 3].map(level => <span key={level} className={`h-1 flex-1 rounded-full ${level > strength ? 'bg-[#E5E7EB]' : strength === 3 ? 'bg-emerald-400' : strength === 2 ? 'bg-[#FBB02D]' : 'bg-red-400'}`} />)}</div>}
      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-[#6B7280]"><input type="checkbox" disabled aria-describedby="logout-note" className="mt-0.5 size-4 shrink-0 accent-[#023E8A]" /><span>تسجيل الخروج من كل الأماكن الأخرى لضمان عدم تمكن أي شخص آخر من الوصول إلى حسابك</span></label>
      <p id="logout-note" className="mt-2 mb-6 text-xs leading-relaxed text-[#6B7280]">هذا الخيار غير متاح في واجهة استعادة كلمة السر الحالية.</p>
      <RecoveryError id="password-error" message={error} />
      <RecoveryButton type="submit" disabled={!valid || pending}>{pending ? 'جارٍ تغيير كلمة السر…' : 'متابعة'}</RecoveryButton>
      <button type="button" disabled={pending} onClick={() => { clearRecovery(); navigate('/login', { replace: true }) }} className="mt-2 w-full rounded py-2.5 text-sm font-medium text-[#6B7280] hover:underline focus-visible:outline-2 disabled:opacity-40">تخطي</button>
    </form>
  </RecoveryLayout>
}
