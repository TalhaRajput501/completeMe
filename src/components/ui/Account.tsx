'use client'
import React from 'react'
import { Eye, EyeOff, KeyRound, MailCheck, ShieldCheck, UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useInfoChange } from '@/hooks/useInfoChange'

function PasswordField({
  id,
  label,
  placeholder,
  visible,
  onToggle,
  value,
  onChange,
  disabled,
}: {
  id: string
  label: string
  placeholder: string
  visible: boolean
  onToggle: () => void
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-500"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="absolute inset-y-0 right-3 my-auto h-5 text-slate-500 hover:text-slate-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

function MessageBox({
  message,
}: {
  message: { type: 'success' | 'error'; text: string } | null
}) {
  if (!message) return null

  return (
    <div
      className={`rounded-lg border p-3 text-sm ${
        message.type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {message.text}
    </div>
  )
}

function Account() {
  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  const [currentPassword, setCurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')

  const [passwordMessage, setPasswordMessage] = React.useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [emailMessage, setEmailMessage] = React.useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [usernameMessage, setUsernameMessage] = React.useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [submittingForm, setSubmittingForm] = React.useState<
    'password' | 'email' | 'username' | null
  >(null)

  const { data: session } = useSession()
  const { loading, infoChange } = useInfoChange()

  React.useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email)
    if (session?.user?.username) setUsername(session.user.username)
  }, [session?.user?.email, session?.user?.username])

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsernameMessage(null)

    const normalizedUsername = username.trim().toLowerCase()

    if (!normalizedUsername) {
      setUsernameMessage({
        type: 'error',
        text: 'Please enter a valid username.',
      })
      return
    }

    if (normalizedUsername === session?.user?.username?.toLowerCase()) {
      setUsernameMessage({
        type: 'error',
        text: 'New username must be different from current username.',
      })
      return
    }

    setSubmittingForm('username')
    try {
      const response = await infoChange({
        creds: {
          username: normalizedUsername,
        },
      })
      // if(!response) throw new Error('Failed to update username')
      setUsernameMessage({
        type: 'success',
        text: response.message || 'Username updated successfully.',
      })
      setUsername(normalizedUsername)
    } catch (error) {
      setUsernameMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to update username.',
      })
    } finally {
      setSubmittingForm(null)
    }
  }

  const handleEmailChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailMessage(null)

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setEmailMessage({
        type: 'error',
        text: 'Please enter a valid email.',
      })
      return
    }

    if (normalizedEmail === session?.user?.email?.toLowerCase()) {
      setEmailMessage({
        type: 'error',
        text: 'New email must be different from current email.',
      })
      return
    }

    setSubmittingForm('email')
    try {
      const response = await infoChange({
        creds: {
          email: normalizedEmail,
        },
      })

      setEmailMessage({
        type: 'success',
        text: response.message || 'Email updated successfully.',
      })
      setEmail(normalizedEmail)
    } catch (error) {
      setEmailMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to update email.',
      })
    } finally {
      setSubmittingForm(null)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({
        type: 'error',
        text: 'All password fields are required.',
      })
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: 'error',
        text: 'New password and confirm password do not match.',
      })
      return
    }

    setSubmittingForm('password')
    try {
      const response = await infoChange({
        creds: {
          currentPassword,
          password: newPassword,
          confirmPassword,
        },
      })

      setPasswordMessage({
        type: 'success',
        text: response.message || 'Password updated successfully.',
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setPasswordMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to update password.',
      })
    } finally {
      setSubmittingForm(null)
    }
  }

  const adminLabel = session?.user?.username || 'Admin'
  const adminRole = session?.user?.role || 'Administrator'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Account Settings</h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Single-user setup detected: <span className="font-semibold">{adminLabel}</span>.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center uppercase">
            {adminLabel.slice(0, 1)}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{adminLabel} Account</p>
            <p className="text-xs text-slate-500">Role: {adminRole}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="basis-1/2 space-y-4 order-1">
          <form
            noValidate
            onSubmit={handleUsernameChange}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center gap-2 text-slate-800">
              <UserRound className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-base sm:text-lg">Change Username</h3>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="off"
                disabled={loading}
              />
              {session?.user?.username && (
                <p className="mt-2 text-xs text-slate-500">
                  Current username: {session.user.username}
                </p>
              )}
            </div>

            <MessageBox message={usernameMessage} />

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {submittingForm === 'username' && loading ? 'Updating...' : 'Update Username'}
              </button>
            </div>
          </form>

          <form
            noValidate
            onSubmit={handleEmailChange}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center gap-2 text-slate-800">
              <MailCheck className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-base sm:text-lg">Change Email</h3>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="off"
                disabled={loading}
              />
              {session?.user?.email && (
                <p className="mt-2 text-xs text-slate-500">Current email: {session.user.email}</p>
              )}
            </div>

            <MessageBox message={emailMessage} />

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {submittingForm === 'email' && loading ? 'Updating...' : 'Update Email'}
              </button>
            </div>
          </form>
        </div>

        <form
          noValidate
          onSubmit={handlePasswordChange}
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4 basis-1/2 order-2"
        >
          <div className="flex items-center gap-2 text-slate-800">
            <KeyRound className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-base sm:text-lg">Change Password</h3>
          </div>

          <PasswordField
            id="currentPassword"
            label="Current Password"
            placeholder="Enter current password"
            visible={showCurrent}
            onToggle={() => setShowCurrent((prev) => !prev)}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
          />

          <PasswordField
            id="newPassword"
            label="New Password"
            placeholder="Enter new password"
            visible={showNew}
            onToggle={() => setShowNew((prev) => !prev)}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            visible={showConfirm}
            onToggle={() => setShowConfirm((prev) => !prev)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs sm:text-sm text-blue-700">
            <p className="font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Password rules
            </p>
            <p>Use at least 8 characters with a mix of uppercase, lowercase, number, and symbol.</p>
          </div>

          <MessageBox message={passwordMessage} />

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {submittingForm === 'password' && loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Account
