import { CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRecovery } from '../auth/RecoveryContext.js'
import RecoveryLayout from '../components/auth/RecoveryLayout.jsx'
import RecoveryButton from '../components/auth/RecoveryButton.jsx'

export default function PasswordResetSuccessPage() {
  const { clearRecovery } = useRecovery()
  const navigate = useNavigate()
  return <RecoveryLayout centered>
    <div aria-hidden="true" className="relative mx-auto mb-7 size-24"><div className="absolute inset-0 rounded-full bg-[#CAF0F8]/50" /><div className="absolute inset-3 rounded-full bg-[#EFF9FD]" /><div className="absolute inset-0 flex items-center justify-center"><CheckCircle2 size={46} className="text-[#023E8A]" /></div></div>
    <h1 className="mb-3 text-2xl font-black">تم تغيير كلمة السر بنجاح!</h1>
    <p className="mx-auto mb-8 max-w-xs text-sm leading-relaxed text-[#6B7280]">يمكنك الآن استخدام كلمة السر الجديدة لتسجيل الدخول إلى حسابك في منصة cody+.</p>
    <RecoveryButton onClick={() => { clearRecovery(); navigate('/login', { replace: true }) }}>العودة لتسجيل الدخول</RecoveryButton>
  </RecoveryLayout>
}
