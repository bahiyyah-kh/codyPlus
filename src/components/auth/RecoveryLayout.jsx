import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Codypluslogo.png'
import { useRecovery } from '../../auth/RecoveryContext.js'
import StepDots from './StepDots.jsx'

export default function RecoveryLayout({ children, backTo, onBack, step, centered = false }) {
  const { clearRecovery } = useRecovery()
  return <div lang="ar" dir="rtl" className="flex min-h-screen flex-col bg-gradient-to-bl from-[#CAF0F8]/40 via-[#FAFBFC] to-[#FAFBFC] text-[#03045E]">
    <header className="flex h-14 shrink-0 items-center border-b border-[#E5E7EB] bg-white/80 px-5 sm:px-6">
      <Link to="/" onClick={clearRecovery} aria-label="العودة إلى الصفحة الرئيسية" className="rounded hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]"><img src={logo} alt="Cody+" className="h-7 w-auto" /></Link>
    </header>
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-[404px]">
        <div className={`rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(3,4,94,0.07)] sm:p-7 ${centered ? 'text-center' : ''}`}>
          {backTo && <div className="mb-7 flex"><Link to={backTo} onClick={onBack} aria-label="رجوع" className="flex size-9 items-center justify-center rounded-full border border-[#E5E7EB] shadow-sm hover:bg-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023E8A]"><ChevronRight size={19} aria-hidden="true" className="text-[#374151]" /></Link></div>}
          {children}
        </div>
        {step && <StepDots current={step} />}
      </div>
    </main>
  </div>
}
