import { useEffect, useRef, useState } from 'react'

export default function useRecoveryRequest() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const active = useRef(null)
  useEffect(() => () => active.current?.abort(), [])

  async function run(task, onSuccess, onError) {
    if (active.current) return
    const controller = new AbortController()
    active.current = controller
    setPending(true)
    setError('')
    let timedOut = false
    const timeout = setTimeout(() => { timedOut = true; controller.abort() }, 20000)
    try {
      const result = await task(controller.signal)
      if (!controller.signal.aborted) onSuccess(result)
    } catch (failure) {
      if (!controller.signal.aborted || timedOut) {
        setError(timedOut ? 'انتهت مهلة الاتصال. يرجى المحاولة مجدداً.' : failure instanceof TypeError ? 'تعذر الاتصال بالخدمة. تحقق من اتصالك وحاول مجدداً.' : failure.message)
        onError?.(failure)
      }
    } finally {
      clearTimeout(timeout)
      if (!controller.signal.aborted || timedOut) setPending(false)
      if (active.current === controller) active.current = null
    }
  }
  return { pending, error, setError, run }
}
