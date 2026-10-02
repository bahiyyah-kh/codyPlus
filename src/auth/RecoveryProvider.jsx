import { startTransition, useCallback, useState } from 'react'
import { RecoveryContext, emptyRecovery } from './RecoveryContext.js'

export default function RecoveryProvider({ children }) {
  const [recovery, updateRecovery] = useState(emptyRecovery)
  // Match the router's transition priority so guards see state and destination together.
  const setRecovery = useCallback(value => startTransition(() => updateRecovery(value)), [])
  const clearRecovery = () => setRecovery({ ...emptyRecovery })
  return <RecoveryContext.Provider value={{ recovery, setRecovery, clearRecovery }}>{children}</RecoveryContext.Provider>
}
