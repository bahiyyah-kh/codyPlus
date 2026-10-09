const baseUrl = 'https://codyplus.runasp.net'
const errorMessages = {
  INVALID_RESET_CODE:
    'رمز التحقق غير صحيح أو منتهي الصلاحية. اطلب رمزاً جديداً وحاول مجدداً.',
}
// These handlers use the confirmed backend contracts; no recovery secrets are persisted.
async function post(path, body, signal) {
  const response = await fetch(`${baseUrl}/api/auth/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal,
  })
  const raw = await response.text()
  let data
  try { data = raw ? JSON.parse(raw) : null } catch { data = null }
  if (!response.ok) {
    const messages = data?.errors && typeof data.errors === 'object'
      ? Object.values(data.errors).flat().filter(value => typeof value === 'string').join(' ') : ''
    const fallback = response.status === 429
      ? 'طلبات كثيرة. يرجى الانتظار قبل إعادة المحاولة.'
      : response.status >= 500 ? 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.'
        : 'تعذر إكمال الطلب. تحقق من البيانات وحاول مجدداً.'
    
    
        const message = Object.hasOwn(errorMessages, data?.code)
           ? errorMessages[data.code]
           : fallback

        const error = new Error(message)
        error.code = data?.code
        
    error.status = response.status
    const retryHeader = response.headers.get('Retry-After')
    const retry = Number(retryHeader)
    const retryDate = Date.parse(retryHeader)
    error.retryAfter = Number.isFinite(retry) && retry > 0 ? retry : Number.isFinite(retryDate) ? Math.max(1, Math.ceil((retryDate - Date.now()) / 1000)) : 60
    throw error
  }
  return data
}

export const sendResetCode = (email, signal) => post('forgot-password', { email }, signal)
export const resendResetCode = (email, signal) => post('resend-password-reset-code', { email }, signal)
export const verifyResetCode = (email, code, signal) => post('verify-password-reset-code', { email, code }, signal)
export const resetPassword = (resetToken, newPassword, signal) => post('reset-password', { resetToken, newPassword }, signal)
