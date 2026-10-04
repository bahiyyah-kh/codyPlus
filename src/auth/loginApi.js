const authUrl = 'https://codyplus.runasp.net/api/auth'

export async function login(email, password, signal) {
  const csrfResponse = await fetch(`${authUrl}/csrf`, {
    method: 'GET',
    credentials: 'include',
    signal,
  })
  if (!csrfResponse.ok) {
    throw new Error('تعذر تهيئة تسجيل الدخول. يرجى المحاولة مجددًا.')
  }
  const csrfData = await csrfResponse.json()
  const csrfToken = csrfData?.requestToken
  if (typeof csrfToken !== 'string' || !csrfToken.trim()) {
    throw new Error('استجابة حماية تسجيل الدخول غير صالحة. يرجى المحاولة مجددًا.')
  }

  const response = await fetch(`${authUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain',
      'X-CSRF-TOKEN': csrfToken,
    },
    body: JSON.stringify({ email, password }),
    signal,
  })
  const raw = await response.text()
  let data
  try { data = raw ? JSON.parse(raw) : null } catch { data = null }

  if (!response.ok) {
    const validation = data?.errors && typeof data.errors === 'object'
      ? Object.values(data.errors).flat().filter(value => typeof value === 'string').join(' ')
      : ''
    const fallback = response.status === 401
      ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
      : response.status === 429
        ? 'طلبات كثيرة. يرجى الانتظار قبل إعادة المحاولة.'
        : response.status >= 500
          ? 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.'
          : 'تعذر تسجيل الدخول. تحقق من البيانات وحاول مجدداً.'
    throw new Error(validation || (typeof data?.detail === 'string' && data.detail) || fallback)
  }

  if (typeof data?.accessToken !== 'string' || !data.accessToken ||
      !Number.isFinite(Date.parse(data.expiresAt)) || Date.parse(data.expiresAt) <= Date.now() ||
      typeof data.user?.id !== 'string') {
    throw new Error('استجابة تسجيل الدخول غير صالحة. يرجى المحاولة مجدداً.')
  }

  return { accessToken: data.accessToken, expiresAt: data.expiresAt, user: data.user }
}

export function saveSession(session) {
  try {
    sessionStorage.setItem('codyplus.auth', JSON.stringify(session))
  } catch {
    throw new Error('تعذر حفظ جلسة الدخول. يرجى السماح بتخزين بيانات الموقع ثم المحاولة مجدداً.')
  }
}
                     
