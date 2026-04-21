// app/signup/page.js
"use client"

import { useFormState, useFormStatus } from "react-dom"  // ← useFormState, not useActionState
import Link from "next/link"
import { signup } from "../actions/auth"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary ${pending ? "loading" : ""}`}
    >
      {pending ? (
        <><span className="spinner" />Creating account…</>
      ) : (
        "Create Account"
      )}
    </button>
  )
}

export default function SignupPage() {
  const [state, formAction] = useFormState(signup, null)  // ← useFormState

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-mark">🔐</div>
          <h1>Create Account</h1>
          <p>Join us — it only takes a moment</p>
        </div>

        {state?.error && (
          <div className="alert alert-error" style={{ marginBottom: "1rem" }}>
            ⚠️ {state.error}
          </div>
        )}

        <form action={formAction} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <SubmitButton />
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}