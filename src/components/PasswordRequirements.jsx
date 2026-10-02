import { Check, Circle } from 'lucide-react'

export default function PasswordRequirements({ requirements }) {
  const completedRequirements = requirements.filter((requirement) => requirement.met).length
  const isPasswordValid = requirements.every((requirement) => requirement.met)

  return (
    <div id="password-helper" className="mt-2 rounded-xl bg-[#08458e]/[0.03] px-3 py-2.5 text-xs">
      <p role="status" aria-live="polite" className="mb-1.5 flex items-center gap-1.5 font-medium text-[#08458e]">
        {isPasswordValid && <Check size={14} aria-hidden="true" />}
        {isPasswordValid ? 'كلمة المرور تستوفي جميع الشروط' : 'قوة كلمة المرور: أكمل الشروط'}
      </p>
      <div role="meter" aria-label="مدى اكتمال شروط كلمة المرور" aria-valuemin={0} aria-valuemax={5} aria-valuenow={completedRequirements} aria-valuetext={`${completedRequirements} من 5 شروط مكتملة`} className="mb-2.5 flex gap-1">
        {requirements.map(({ id }, index) => (
          <span key={id} aria-hidden="true" className={`h-1 flex-1 rounded-full transition-colors ${index < completedRequirements ? 'bg-[#08458e]' : 'bg-[#08458e]/10'}`} />
        ))}
      </div>
      <ul aria-label="شروط كلمة المرور" className="space-y-1.5">
        {requirements.map(({ id, label, met }) => (
          <li key={id} className={`flex items-center gap-2 ${met ? 'text-[#08458e]' : 'text-slate-500'}`}>
            <span className={`flex size-4 shrink-0 items-center justify-center rounded-full ${met ? 'bg-[#08458e]/10' : ''}`}>
              {met ? <Check size={12} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
            </span>
            <span className="sr-only">{met ? 'مكتمل: ' : 'غير مكتمل: '}</span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
