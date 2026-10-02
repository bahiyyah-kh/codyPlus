import { useRef, useState } from 'react'
import { Check, Eye, EyeOff, Rocket } from 'lucide-react'
import codyLogo from '../assets/Codypluslogo.png'
import PasswordRequirements from '../components/PasswordRequirements'

const registerErrors = {
  EMAIL_ALREADY_EXISTS: { field: 'email', message: 'يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل. يمكنك تسجيل الدخول أو استخدام بريد إلكتروني آخر.' },
  INVALID_EMAIL: { field: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح.' },
  PASSWORD_TOO_SHORT: { field: 'password', message: 'يجب أن تتكون كلمة المرور من 8 خانات على الأقل.' },
  PASSWORD_REQUIRES_NON_ALPHANUMERIC: { field: 'password', message: 'يجب أن تحتوي كلمة المرور على رمز خاص مثل ! @ # $.' },
  PASSWORD_REQUIRES_DIGIT: { field: 'password', message: 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.' },
  PASSWORD_REQUIRES_LOWER: { field: 'password', message: 'يجب أن تحتوي كلمة المرور على حرف إنجليزي صغير واحد على الأقل.' },
  PASSWORD_REQUIRES_UPPER: { field: 'password', message: 'يجب أن تحتوي كلمة المرور على حرف إنجليزي كبير واحد على الأقل.' },
  PASSWORD_REQUIRES_UNIQUE_CHARS: { field: 'password', message: 'كلمة المرور لا تستوفي متطلبات الأمان.' },
  OPERATION_FAILED: { message: 'تعذّر إنشاء الحساب. يرجى التحقق من البيانات والمحاولة مرة أخرى.' },
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formValues, setFormValues] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const requestInProgress = useRef(false)
  const passwordRequirements = [
    { id: 'length', label: '8 خانات على الأقل', met: formValues.password.length >= 8 },
    { id: 'uppercase', label: <>حرف كبير <bdi dir="ltr">(A-Z)</bdi></>, met: /[A-Z]/.test(formValues.password) },
    { id: 'lowercase', label: <>حرف صغير <bdi dir="ltr">(a-z)</bdi></>, met: /[a-z]/.test(formValues.password) },
    { id: 'digit', label: <>رقم واحد على الأقل <bdi dir="ltr">(0-9)</bdi></>, met: /[0-9]/.test(formValues.password) },
    { id: 'special', label: <>رمز خاص مثل <bdi dir="ltr">! @ # $</bdi></>, met: /[^a-zA-Z0-9]/.test(formValues.password) },
  ]
  const isPasswordValid = passwordRequirements.every((requirement) => requirement.met)
  const hasConfirmation = formValues.confirmPassword.length > 0
  const passwordsMatch = formValues.password === formValues.confirmPassword

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((values) => ({ ...values, [name]: value }))
    setFieldErrors((errors) => ({
      ...errors,
      [name]: undefined,
      ...(name === 'password' ? { confirmPassword: undefined } : {}),
    }))
    setErrorMessage('')
    setSuccessMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (requestInProgress.current) return

    const passwordErrors = {}
    if (!isPasswordValid) {
      passwordErrors.password = 'اضغط على خانة كلمة المرور وأكمل الشروط لتكون جاهزة.'
    }
    if (!hasConfirmation) {
      passwordErrors.confirmPassword = 'أعد كتابة كلمة المرور لتأكيدها.'
    }
    if (!isPasswordValid || !passwordsMatch || !hasConfirmation) {
      setFieldErrors(passwordErrors)
      setSuccessMessage('')
      setErrorMessage('')
      return
    }

    requestInProgress.current = true
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('https://codyplus.runasp.net/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(formValues),
      })
      // An empty or non-JSON body must not hide the HTTP response status.
      const data = await response.json().catch(() => null)

      if (response.status === 201) {
        if (data?.confirmationEmailSent === true) {
          setSuccessMessage('تم إنشاء حسابك بنجاح! تحقق من بريدك الإلكتروني لتفعيل حسابك قبل تسجيل الدخول.')
        } else if (data?.confirmationEmailSent === false) {
          setSuccessMessage('تم إنشاء حسابك، ولكن تعذّر إرسال رسالة التفعيل إلى بريدك الإلكتروني. حاول مرة أخرى لاحقًا.')
        } else {
          setSuccessMessage('تم إنشاء حسابك بنجاح.')
        }
        setFormValues((values) => ({ ...values, password: '', confirmPassword: '' }))
      } else if (response.status === 400) {
        const errors = {}
        let generalError = ''
        const codes = Array.isArray(data?.errorCodes) ? data.errorCodes : [data?.errorCodes]
        for (const code of codes) {
          const error = typeof code === 'string' && Object.hasOwn(registerErrors, code)
            ? registerErrors[code]
            : null
          if (error?.field) {
            // Keep one actionable message per field.
            errors[error.field] ??= error.message
          } else {
            generalError ||= error?.message || 'يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.'
          }
        }
        setFieldErrors(errors)
        setErrorMessage(generalError || (Object.keys(errors).length ? '' : 'يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.'))
      } else {
        setErrorMessage(response.status >= 500
          ? 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.'
          : 'تعذر إنشاء الحساب. يرجى المحاولة مرة أخرى.')
      }
    } catch {
      setErrorMessage('تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.')
    } finally {
      requestInProgress.current = false
      setIsSubmitting(false)
    }
  }

  function inputProps(name) {
    const descriptionIds = [
      fieldErrors[name] ? `${name}-error` : null,
      name === 'password' && isPasswordFocused ? 'password-helper' : null,
      name === 'confirmPassword' && hasConfirmation ? 'password-match' : null,
    ].filter(Boolean).join(' ')
    return {
      value: formValues[name],
      onChange: handleChange,
      disabled: isSubmitting,
      'aria-invalid': Boolean(fieldErrors[name]) || (name === 'confirmPassword' && hasConfirmation && !passwordsMatch),
      'aria-describedby': descriptionIds || undefined,
    }
  }

  function renderFieldError(name) {
    return fieldErrors[name]
      ? <p id={`${name}-error`} className="mt-2 text-sm text-red-600">{fieldErrors[name]}</p>
      : null
  }

  const inputClassName = 'h-12 w-full rounded-full border border-gray-200 bg-white px-4 text-sm text-slate-800 outline-none placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100'
  const toggleClassName = 'absolute inset-y-0 left-1 flex w-11 items-center justify-center rounded-full text-slate-500 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700'

  return (
    <div dir="rtl" lang="ar" className="min-h-svh bg-[linear-gradient(120deg,#fafbfc_0%,#f8fbfc_45%,#edf9fc_100%)] font-sans text-[#08085a]">
      <header dir="ltr" className="flex h-16 items-center justify-end border-b border-gray-100 bg-white px-5 sm:px-8">
        <img src={codyLogo} alt="Cody+" className="h-9 w-auto object-contain" />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-8 sm:py-10">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#08458e] text-white">
          <Rocket size={29} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-center text-2xl font-black">ابدأ رحلتك التعليمية</h1>
        <p className="mt-2 text-center text-sm text-gray-400">أنشئ حسابك الآن</p>

        <div className="mt-8 w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] sm:p-6">
          <form noValidate onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-4 text-right">
            <div>
              <label htmlFor="full-name" className="mb-2 block text-sm font-medium">الاسم الكامل</label>
              <input id="full-name" name="fullName" {...inputProps('fullName')} type="text" autoComplete="name" placeholder="أدخل اسمك الكامل" className={inputClassName} />
              {renderFieldError('fullName')}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
              <input id="email" name="email" {...inputProps('email')} type="email" dir="ltr" autoComplete="email" placeholder="example@email.com" className={inputClassName} />
              {renderFieldError('email')}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">كلمة المرور</label>
              <div className="relative">
                <input id="password" name="password" {...inputProps('password')} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="أدخل كلمة المرور" className={`${inputClassName} pl-14`} />
                <button type="button" aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} aria-controls="password" onClick={() => setShowPassword((visible) => !visible)} className={toggleClassName}>
                  {showPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
                </button>
              </div>
              {isPasswordFocused && (
                <PasswordRequirements requirements={passwordRequirements} />
              )}
              {renderFieldError('password')}
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">تأكيد كلمة المرور</label>
              <div className="relative">
                <input id="confirm-password" name="confirmPassword" {...inputProps('confirmPassword')} type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="أعد إدخال كلمة المرور" className={`${inputClassName} pl-14`} />
                <button type="button" aria-label={showConfirmPassword ? 'إخفاء تأكيد كلمة المرور' : 'إظهار تأكيد كلمة المرور'} aria-controls="confirm-password" onClick={() => setShowConfirmPassword((visible) => !visible)} className={toggleClassName}>
                  {showConfirmPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
                </button>
              </div>
              {renderFieldError('confirmPassword')}
              <div role="status" aria-live="polite" aria-atomic="true">
                {hasConfirmation && (
                  <p id="password-match" className={`mt-2 flex items-center gap-1.5 text-sm ${passwordsMatch ? 'text-green-700' : 'text-red-600'}`}>
                    {passwordsMatch && <Check size={16} className="shrink-0" aria-hidden="true" />}
                    {passwordsMatch ? 'كلمتا المرور متطابقتان' : 'كلمتا المرور غير متطابقتين'}
                  </p>
                )}
              </div>
            </div>

            {errorMessage && <p role="alert" className="text-sm text-red-600">{errorMessage}</p>}
            {successMessage && <p role="status" className="text-sm text-green-700">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting} className="min-h-12 w-full rounded-full bg-[#08458e] px-4 py-3 text-base font-medium text-white hover:bg-[#063975] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}</button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-400">
            لديك حساب بالفعل؟{' '}
            <span className="text-[#08458e]">تسجيل الدخول</span>
          </p>
        </div>
      </main>
    </div>
  )
}
