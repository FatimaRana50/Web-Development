// app/actions/auth.js
// Server Actions — these functions run ONLY on the server (never exposed to the client)

"use server"

import { connectDB } from "../lib/db"
import User from "../models/User"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// ─────────────────────────────────────────────
// SIGNUP — Create a new user account
// ─────────────────────────────────────────────
export async function signup(prevState, formData) {
  // Extract values from the submitted form
  const email = formData.get("email")?.toString().trim().toLowerCase()
  const password = formData.get("password")?.toString()

  // Basic validation — ensure fields are not empty
  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  // Ensure password meets minimum length
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." }
  }

  try {
    // Connect to the database before any queries
    await connectDB()

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { error: "An account with this email already exists. Please log in." }
    }

    // Hash the password using bcrypt (saltRounds = 10 is a good balance of speed and security)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the new user to the database with the hashed password
    await User.create({
      email,
      password: hashedPassword,
    })

    // Success — redirect to the login page
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "Something went wrong. Please try again." }
  }

  // Redirect must be outside try/catch (Next.js uses thrown redirects internally)
  redirect("/login?registered=true")
}

// ─────────────────────────────────────────────
// LOGIN — Authenticate an existing user
// ─────────────────────────────────────────────
export async function login(prevState, formData) {
  // Extract values from the submitted form
  const email = formData.get("email")?.toString().trim().toLowerCase()
  const password = formData.get("password")?.toString()

  // Basic validation
  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  try {
    // Connect to the database
    await connectDB()

    // Find the user by email in the database
    const user = await User.findOne({ email })

    // If no user found with that email
    if (!user) {
      return { error: "No account found with this email address." }
    }

    // Compare the submitted plain-text password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // If the passwords do not match
    if (!isPasswordValid) {
      return { error: "Incorrect password. Please try again." }
    }

    // ✅ Authentication successful — store the user's email in a cookie (session)
    cookies().set("user", user.email, {
      httpOnly: true,        // Cookie cannot be accessed by JavaScript (security)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      maxAge: 60 * 60 * 24, // Cookie expires after 24 hours (in seconds)
      path: "/",             // Cookie available across the whole site
      sameSite: "lax",       // Protects against CSRF attacks
    })

  } catch (error) {
    console.error("Login error:", error)
    return { error: "Something went wrong. Please try again." }
  }

  // Redirect must be outside try/catch
  redirect("/dashboard")
}

// ─────────────────────────────────────────────
// LOGOUT — End the user's session
// ─────────────────────────────────────────────
export async function logout() {
  // Delete the session cookie to log the user out
  cookies().delete("user")

  // Redirect back to the login page
  redirect("/login")
}
