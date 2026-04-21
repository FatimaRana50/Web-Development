# Task 8 — Authentication System

A complete authentication system built with **Next.js 14**, **MongoDB**, **Mongoose**, and **bcrypt**.

---

## Features

- ✅ User Signup (with duplicate email prevention)
- ✅ Secure Login (bcrypt password comparison)
- ✅ Protected Dashboard (cookie-based session)
- ✅ Logout (clears session cookie)
- ✅ Loading states on forms
- ✅ Error messages for invalid input
- ✅ Clean, responsive UI
- ✅ Unique footer logo with copyright

---

## Prerequisites

- **Node.js** 18+ installed
- **MongoDB** running locally on port 27017

---

## Setup Instructions

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Configure environment

Open `.env.local` and set your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/task8auth
```

If MongoDB is running locally (default install), this value is already correct.

### Step 3 — Start MongoDB

Make sure your local MongoDB service is running:

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

### Step 4 — Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
 ├─ layout.js          # Root layout
 ├─ page.js            # Root route (redirects to /login)
 ├─ globals.css        # All styles
 ├─ login/
 │   └─ page.js        # Login form page
 ├─ signup/
 │   └─ page.js        # Signup form page
 ├─ dashboard/
 │   └─ page.js        # Protected dashboard
 ├─ actions/
 │   └─ auth.js        # Server Actions (signup, login, logout)
 ├─ lib/
 │   └─ db.js          # MongoDB connection utility
 └─ models/
     └─ User.js        # Mongoose User schema/model
```

---

## How Authentication Works

1. **Signup** → User submits form → password hashed with bcrypt (10 rounds) → saved in MongoDB → redirect to login
2. **Login** → User submits form → email found in DB → bcrypt.compare() verifies password → session cookie set → redirect to dashboard
3. **Dashboard** → Cookie checked server-side → if missing, redirect to login → if present, show user data
4. **Logout** → Cookie deleted → redirect to login

---

## Security Notes

- Passwords are **never stored in plain text** — bcrypt hashes them
- Session cookie is **httpOnly** (inaccessible to JavaScript)
- Cookie expires after **24 hours**
- For production, also enable HTTPS (secure cookie flag is already conditional on `NODE_ENV`)
