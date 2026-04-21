// app/layout.js
// Root layout — wraps every page in the app

import "./globals.css"

export const metadata = {
  title: "Task8 Auth App",
  description: "Complete authentication system with Next.js and MongoDB",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
