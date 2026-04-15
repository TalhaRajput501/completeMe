'use client'
import React, { useState } from 'react'
import { Eye, EyeOff, KeyRound, Mail, MailCheck, ShieldCheck } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useInfoChange } from '@/hooks/useInfoChange'

function PasswordField({
  id,
  label,
  placeholder,
  visible,
  onToggle,
  ...rest
}: {
  id: string
  label: string
  placeholder: string
  visible: boolean
  onToggle: () => void
} & React.ComponentPropsWithoutRef<'input'>
) {
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
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
          {...rest}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-3 my-auto h-5 text-slate-500 hover:text-slate-700"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

function Account() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')

  const session = useSession()

  const handlePasswordChange = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('') // Clear previous errors
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required')
      return
    }

    const matchPassword = currentPassword === newPassword || currentPassword === confirmPassword;
    const differPassword = newPassword !== confirmPassword;

    if (matchPassword) {
      setError("New password cannot be the same as the old password")
    }

    if (differPassword) {
      setError("New password and confirm password do not match")
    }

    console.log('Three of the password fields:', { currentPassword, newPassword, confirmPassword })
    // useInfoChange({ creds: { password: { current: currentPassword, new: newPassword, confirm: confirmPassword } } })
  }


  const handleEmailChange = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Session data on form submit:', session)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Account Settings</h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Single-user setup detected: <span className="font-semibold">Admin</span>.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
            A
          </div>
          <div>
            <p className="font-semibold text-slate-800">Admin Account</p>
            <p className="text-xs text-slate-500">Role: Administrator</p>
          </div>
        </div>
      </div>


      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4' >

        {/* Password Change Form */}
        <form
          noValidate
          onSubmit={handlePasswordChange}
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4 basis-1/2  "
        >
          <div className="flex items-center gap-2 text-slate-800">
            <KeyRound className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-base sm:text-lg">Change Password</h3>
          </div>

          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-xs sm:text-sm text-red-700">
              {error}
            </div>
          )}

          <PasswordField
            id="currentPassword"
            label="Current Password"
            placeholder="Enter current password"
            visible={showCurrent}
            value={currentPassword}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
            onToggle={() => setShowCurrent((prev) => !prev)}
          />

          <PasswordField
            id="newPassword"
            label="New Password"
            placeholder="Enter new password"
            visible={showNew}
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            onToggle={() => setShowNew((prev) => !prev)}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="Re-enter new password"
            visible={showConfirm}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            onToggle={() => setShowConfirm((prev) => !prev)}
          />

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs sm:text-sm text-blue-700">
            <p className="font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Password rules
            </p>
            <p>Use at least 8 characters with a mix of uppercase, lowercase, number, and symbol.</p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
            {/* <button
              type="reset"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Clear
            </button> */}
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer "
            >
              Update Password
            </button>
          </div>
        </form>


        {/* Email Change Form */}
        <form
          onSubmit={handleEmailChange}
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4 basis-1/2  "
        >
          <div className="flex items-center gap-2 text-slate-800">
            <MailCheck className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-base sm:text-lg">Change Email</h3>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <div className="mt-1 relative">
              <input
                name='email'
                type={'text'}
                placeholder='Enter New E-mail'
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Update Email
            </button>
          </div>
        </form>

      </div>


    </div>
  )
}

export default Account
