import { useRef } from 'react'

function digits(value) {
  return value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776)).replace(/\D/g, '')
}

export default function OtpInput({ value, onChange, disabled, invalid }) {
  const refs = useRef([])
  const boxes = Array.from({ length: 6 }, (_, i) => value[i] || '')
  const insert = (index, text) => {
    const incoming = digits(text).slice(0, 6)
    const next = [...boxes]
    if (!incoming) next[index] = ''
    else incoming.split('').forEach((digit, offset) => { if (index + offset < 6) next[index + offset] = digit })
    onChange(next)
    if (incoming) refs.current[Math.min(index + incoming.length, 5)]?.focus()
  }
  return <div dir="ltr" role="group" aria-label="رمز التأكيد المكون من ستة أرقام" className="mb-7 grid grid-cols-6 gap-1.5 sm:gap-2.5">
    {boxes.map((digit, index) => <input key={index} ref={element => { refs.current[index] = element }} type="text" inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} aria-label={`الرقم ${index + 1}`} aria-invalid={invalid || undefined} aria-describedby={invalid ? 'otp-error' : undefined} disabled={disabled} value={digit} onFocus={event => event.target.select()} onChange={event => insert(index, event.target.value)} onPaste={event => { event.preventDefault(); const pasted = digits(event.clipboardData.getData('text')); insert(pasted.length === 6 ? 0 : index, pasted) }} onKeyDown={event => {
      if (event.key === 'Backspace') {
        event.preventDefault()
        const target = boxes[index] ? index : Math.max(0, index - 1)
        const next = [...boxes]; next[target] = ''; onChange(next); refs.current[target]?.focus()
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); refs.current[Math.max(0, Math.min(5, index + (event.key === 'ArrowLeft' ? -1 : 1)))]?.focus()
      }
    }} className={`h-12 w-full min-w-0 rounded-full border text-center text-xl font-bold text-[#03045E] outline-none focus:border-[#023E8A] focus:ring-2 focus:ring-[#00B4D8]/30 disabled:opacity-60 ${invalid ? 'border-red-400' : digit ? 'border-[#023E8A] bg-[#EFF9FD]' : 'border-[#E5E7EB]'}`} />)}
  </div>
}
