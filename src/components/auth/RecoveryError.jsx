import { AlertCircle } from 'lucide-react'

export default function RecoveryError({ message, id }) {
  return message ? <div id={id} role="alert" className="my-3 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 p-3 text-xs leading-relaxed text-red-600"><AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" /><p className="min-w-0 wrap-break-word">{message}</p></div> : null
}
