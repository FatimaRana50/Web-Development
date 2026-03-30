# Task5 – Angular Routing

A simple Angular app demonstrating **child routes** under a Dashboard shell component, with navigation between Home, About, and Feedback pages.

---

## Project Structure

```
src/app/
├── app.component.html          ← Root outlet
├── app.module.ts               ← Declares all components
├── app-routing.module.ts       ← All route definitions
├── dashboard/
│   ├── dashboard.component.html  ← Navbar + child <router-outlet>
│   └── dashboard.component.css
├── home/
│   └── home.component.html
├── about/
│   └── about.component.html
└── feedback/
    └── feedback.component.html
```

---

## Route Architecture

```
/                        → redirects to /dashboard
/dashboard               → redirects to /dashboard/home
/dashboard/home          → HomeComponent       (inside Dashboard)
/dashboard/about         → AboutComponent      (inside Dashboard)
/dashboard/feedback      → FeedbackComponent   (inside Dashboard)
**                       → redirects to /dashboard (fallback)
```

The `DashboardComponent` acts as a **layout shell** — it renders the navbar and a `<router-outlet>` where child components are injected.

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Generate components (if not already done)
```bash
ng generate component dashboard
ng generate component home
ng generate component about
ng generate component feedback
```

### 3. Serve the app
```bash
ng serve
```

Open your browser at `http://localhost:4200`

---

## Key Concepts Used

| Concept | Where Used |
|---|---|
| `RouterModule.forRoot()` | `app-routing.module.ts` |
| Child routes (`children: []`) | Under `dashboard` path |
| `<router-outlet>` | `app.component.html` (root) and `dashboard.component.html` (child) |
| `redirectTo` + `pathMatch: 'full'` | Default and fallback routes |
| `routerLink` | Navigation links in Dashboard navbar |
| `routerLinkActive` | Highlights the active nav link |

---

## How Routing Works (Step by Step)

1. User visits `/` → redirected to `/dashboard`
2. `/dashboard` → redirected to `/dashboard/home` (default child)
3. `AppComponent` renders its `<router-outlet>` → loads `DashboardComponent`
4. `DashboardComponent` shows the navbar and its own `<router-outlet>`
5. The child outlet renders `HomeComponent`, `AboutComponent`, or `FeedbackComponent` based on the URL

---

## Navigation Links

The navbar in `DashboardComponent` uses **relative** `routerLink` values:

```html
<a routerLink="home">Home</a>
<a routerLink="about">About</a>
<a routerLink="feedback">Feedback</a>
```

These are relative to the current route (`/dashboard/`), so they resolve to `/dashboard/home`, etc.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Page blank on load | Check `AppRoutingModule` is imported in `app.module.ts` |
| Child routes not rendering | Make sure `dashboard.component.html` has `<router-outlet>` |
| `routerLink` not working | Ensure `RouterModule` is exported from `AppRoutingModule` |
| 404 on refresh | Add `{ useHash: true }` to `RouterModule.forRoot(routes, { useHash: true })` |