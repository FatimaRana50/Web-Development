// app/login/page.js
"use client"

import { useFormState, useFormStatus } from "react-dom"  // ← useFormState, not useActionState
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { login } from "../actions/auth"
import { Suspense } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary ${pending ? "loading" : ""}`}
    >
      {pending ? (
        <><span className="spinner" />Signing in…</>
      ) : (
        "Sign In"
      )}
    </button>
  )
}

function LoginForm() {
  const [state, formAction] = useFormState(login, null)  // ← useFormState
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get("registered") === "true"

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-mark">🔐</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {justRegistered && (
          <div className="alert alert-success" style={{ marginBottom: "1rem" }}>
            ✅ Account created! You can now sign in.
          </div>
        )}

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
              placeholder="Your password"
              required
              autoComplete="current-password"
            />
          </div>

          <SubmitButton />
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link href="/signup">Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}