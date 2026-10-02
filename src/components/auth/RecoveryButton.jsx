export default function RecoveryButton({ children, variant = 'primary', type = 'button', className = '', ...props }) {
  return <button type={type} {...props} className={`min-h-11 w-full rounded-full px-4 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A] disabled:cursor-not-allowed disabled:opacity-40 ${variant === 'secondary' ? 'bg-[#F1F5F9] text-[#374151] hover:bg-[#E5E7EB]' : 'bg-[#023E8A] text-white shadow-sm hover:bg-[#03045E]'} ${className}`}>{children}</button>
}
