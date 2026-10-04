import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CodyWelcomePage from './pages/welcomPage/CodyWelcomePage.jsx'
import OnboardingPage from './pages/welcomPage/OnboardingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import RecoveryMethodPage from './pages/RecoveryMethodPage.jsx'
import VerifyCodePage from './pages/VerifyCodePage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import PasswordResetSuccessPage from './pages/PasswordResetSuccessPage.jsx'
import RecoveryProvider from './auth/RecoveryProvider.jsx'
import { useRecovery } from './auth/RecoveryContext.js'

function RecoveryGuard({ step, children }) {
  const { recovery } = useRecovery()

  if (step === 5) {
    return recovery.complete
      ? children
      : <Navigate to="/forgot-password" replace />
  }

  if (!recovery.email) {
    return <Navigate to="/forgot-password" replace />
  }

  if (step >= 3 && !recovery.codeSent) {
    return <Navigate to="/forgot-password/recovery-method" replace />
  }

  if (
    step >= 4 &&
    (!recovery.resetToken ||
      !Number.isFinite(Date.parse(recovery.expiresAt)))
  ) {
    return <Navigate to="/forgot-password/verify-code" replace />
  }

  return children
}

function AppRoutes() {
  const navigate = useNavigate()
  const { clearRecovery } = useRecovery()

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onLogin={() => navigate('/login')} />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/welcome" element={<CodyWelcomePage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        path="/login"
        element={
          <LoginPage
            onBackHome={() => navigate('/')}
            onForgotPassword={() => {
              clearRecovery()
              navigate('/forgot-password')
            }}
          />
        }
      />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="/forgot-password/recovery-method"
        element={
          <RecoveryGuard step={2}>
            <RecoveryMethodPage />
          </RecoveryGuard>
        }
      />
      <Route
        path="/forgot-password/verify-code"
        element={
          <RecoveryGuard step={3}>
            <VerifyCodePage />
          </RecoveryGuard>
        }
      />
      <Route
        path="/forgot-password/reset-password"
        element={
          <RecoveryGuard step={4}>
            <ResetPasswordPage />
          </RecoveryGuard>
        }
      />
      <Route
        path="/forgot-password/success"
        element={
          <RecoveryGuard step={5}>
            <PasswordResetSuccessPage />
          </RecoveryGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RecoveryProvider>
        <AppRoutes />
      </RecoveryProvider>
    </BrowserRouter>
  )
}
