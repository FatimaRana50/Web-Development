// app/page.js
// Root route — just redirect to /login

import { redirect } from "next/navigation"

export default function Home() {
  redirect("/login")
}
