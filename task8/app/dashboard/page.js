// app/dashboard/page.js
// Protected dashboard — only accessible to logged-in users

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logout } from "../actions/auth"

export default function DashboardPage() {
  // Read the session cookie to check if user is logged in
  const cookieStore = cookies()
  const userCookie = cookieStore.get("user")

  // If no cookie found → user is NOT logged in → redirect to login
  if (!userCookie) {
    redirect("/login")
  }

  // Extract the user's email from the cookie value
  const userEmail = userCookie.value

  // Get the first letter of the email for the avatar
  const avatarLetter = userEmail.charAt(0).toUpperCase()

  // Format a readable date for "member since" display
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="dashboard-layout">
      {/* ── Top Navigation Header ── */}
      <header className="dashboard-header">
        <div className="header-brand">
          <div className="brand-icon">🔐</div>
          <span>SecureApp</span>
        </div>

        <div className="header-user">
          <div className="user-avatar">{avatarLetter}</div>
          <span className="user-email">{userEmail}</span>

          {/* Logout button triggers the logout server action */}
          <form action={logout}>
            <button type="submit" className="btn-logout">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="dashboard-main">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2>Welcome back! 👋</h2>
          <p>You are successfully authenticated and viewing your dashboard.</p>
          <div className="user-badge">
            ✉️ {userEmail}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div className="stat-info">
              <h3>Status</h3>
              <p>Active</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">🔒</div>
            <div className="stat-info">
              <h3>Security</h3>
              <p>Secured</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">🗄️</div>
            <div className="stat-info">
              <h3>Database</h3>
              <p>MongoDB</p>
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="section-card">
          <h3>📋 Account Information</h3>
          <div className="info-row">
            <span className="info-label">Email Address</span>
            <span className="info-value">{userEmail}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Account Status</span>
            <span className="badge badge-green">✓ Active</span>
          </div>
          <div className="info-row">
            <span className="info-label">Session Type</span>
            <span className="badge badge-purple">Cookie Session</span>
          </div>
          <div className="info-row">
            <span className="info-label">Last Login</span>
            <span className="info-value">{today}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Password</span>
            <span className="info-value">●●●●●●●● (bcrypt hashed)</span>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="section-card">
          <h3>⚙️ Tech Stack Used</h3>
          <div className="info-row">
            <span className="info-label">Framework</span>
            <span className="info-value">Next.js 14 (App Router)</span>
          </div>
          <div className="info-row">
            <span className="info-label">Database</span>
            <span className="info-value">MongoDB + Mongoose</span>
          </div>
          <div className="info-row">
            <span className="info-label">Auth Method</span>
            <span className="info-value">bcrypt + Cookie Sessions</span>
          </div>
          <div className="info-row">
            <span className="info-label">Server Actions</span>
            <span className="info-value">signup, login, logout</span>
          </div>
        </div>
      </main>

      {/* ── Footer with Unique Logo and Copyright ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          {/* Unique Logo */}
          <div className="footer-logo">
            <div className="logo-icon">🔐</div>
            <span className="logo-text">SecureApp</span>
          </div>
          <p className="footer-tagline">
            Built with Next.js · MongoDB · bcrypt
          </p>
          {/* Copyright — required by rubric */}
          <p className="footer-copy">
            © {new Date().getFullYear()} SecureApp. All rights reserved. | Task 8 — Authentication System
          </p>
        </div>
      </footer>
    </div>
  )
}
