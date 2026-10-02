import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { emptyRecovery, useRecovery } from '../auth/RecoveryContext.js'
import RecoveryLayout from '../components/auth/RecoveryLayout.jsx'
import RecoveryButton from '../components/auth/RecoveryButton.jsx'
import RecoveryError from '../components/auth/RecoveryError.jsx'

export default function ForgotPasswordPage() {
  const { recovery, setRecovery, clearRecovery } = useRecovery()
  const [email, setEmail] = useState(recovery.email)
  const [error, setError] = useState('')
  const input = useRef(null)
  const navigate = useNavigate()
  function submit(event) {
    event.preventDefault()
    const entered = email.trim()
    if (!entered || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entered)) {
      setError(entered ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'يرجى إدخال بريدك الإلكتروني.'); input.current?.focus(); return
    }
    setRecovery({ ...emptyRecovery, email: entered })
    navigate('/forgot-password/recovery-method')
  }
  return <RecoveryLayout backTo="/login" onBack={clearRecovery} step={1}>
    <h1 className="mb-1 text-xl font-black">البحث عن حسابك</h1>
    <p className="mb-6 text-sm leading-relaxed text-[#6B7280]">أدخل بريدك الإلكتروني.</p>
    <form onSubmit={submit} noValidate>
      <label htmlFor="recovery-email" className="sr-only">البريد الإلكتروني</label>
      <div className="relative mb-5">
        <input ref={input} id="recovery-email" type="email" autoComplete="email" required dir="ltr" value={email} onChange={event => { setEmail(event.target.value); setError('') }} aria-invalid={!!error} aria-describedby={error ? 'email-error' : undefined} placeholder="البريد الإلكتروني" className={`h-12 w-full rounded-full border bg-white pr-4 pl-10 text-right text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#023E8A] focus:ring-2 focus:ring-[#00B4D8]/30 ${error ? 'border-red-400' : 'border-[#E5E7EB]'}`} />
        {email && <button type="button" onClick={() => { setEmail(''); setError(''); input.current?.focus() }} aria-label="مسح البريد الإلكتروني" className="absolute top-1/2 left-3 -translate-y-1/2 rounded text-[#6B7280] focus-visible:outline-2"><X size={16} /></button>}
      </div>
      <RecoveryError id="email-error" message={error} />
      <RecoveryButton type="submit">متابعة</RecoveryButton>
    </form>
  </RecoveryLayout>
}
