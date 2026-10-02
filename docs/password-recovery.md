# Password recovery

The five independent recovery pages use native fetch against `https://codyplus.runasp.net`. There is no demo mode or simulated success in the application.

| Action | POST path | JSON body |
| --- | --- | --- |
| Initial code, on the recovery-method page | `/api/auth/forgot-password` | `{ email }` |
| Resend code | `/api/auth/resend-password-reset-code` | `{ email }` |
| Verify code | `/api/auth/verify-password-reset-code` | `{ email, code }` |
| Reset password | `/api/auth/reset-password` | `{ resetToken, newPassword }` |

Verification requires the confirmed response `{ resetToken, expiresAt }`, with a nonempty token and a valid future expiry. Success is shown only after the reset request returns a successful HTTP status. Other successful endpoints may return JSON or an empty body.

Email, progress, resend deadline, and reset token exist only in React memory. OTP and password are page-local. Reloading requires restarting recovery. Completion, account changes, and leaving through the recovery logo clear the flow; completion immediately removes the reset token. Requests are canceled on unmount and time out after 20 seconds. Timers are cleaned up on unmount. Initial send and successful resend start a 60-second cooldown; resend HTTP 429 honors an accessible Retry-After header, defaulting to 60 seconds.

API validation errors (`errors`), `message`, `detail`, or `title` are displayed as text. Unrecognized errors have Arabic fallbacks; network/CORS failures do not advance the flow. Backend success responses should not use HTTP 200 to signal failed operations.

## Details still requiring backend confirmation

- The supplied contracts came from the user's Swagger recording. The standard `/swagger/v1/swagger.json` URL returned HTTP 404 during implementation, so the schema could not be independently inspected. The attached text contained the Figma component, with no separate backend update.
- The exact password policy is unconfirmed. Frontend validation currently follows the requested minimum of six characters containing letters and numbers; server validation errors remain authoritative.
- Exact error schemas/status codes and reset-token expiry timezone conventions have not been independently verified.
- No session-revocation field exists in the confirmed reset contract. The reference checkbox is visible, disabled, and explained; no extra field is sent and no session termination is claimed.
- A deployment must allow browser requests from its frontend origin through backend CORS. Reading Retry-After also requires that response header to be exposed by CORS. Live CORS and email delivery were not tested with a real account.
- Production hosting must provide SPA fallback to `index.html` for the BrowserRouter routes. No Register page or support destination existed, and neither was invented.

## Validation

ESLint and the Vite production build are the existing project checks. Temporary headless Edge tests used intercepted responses only, without sending recovery emails or changing a real password. They covered success and HTTP/network failures, request payloads, missing tokens, rate limiting, expiry, direct-route guards, explicit/browser back, account changes, email validation, OTP entry/paste/Backspace, countdown/toast timing, password visibility, skip, success cleanup, and 320px layout overflow. These tests do not verify the live backend.
