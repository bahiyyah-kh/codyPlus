import { createContext, useContext } from 'react'

export const RecoveryContext = createContext(null)
export const emptyRecovery = { email: '', codeSent: false, resetToken: '', expiresAt: '', complete: false, resendAt: 0 }

export function useRecovery() {
  return useContext(RecoveryContext)
}

export function maskEmail(email) {
  const [local, domain] = email.split('@')
  return `${local.length > 1 ? `${local[0]}${'*'.repeat(Math.max(1, local.length - 2))}${local.at(-1)}` : '*'}@${domain}`
}
