# Instituto Relva

A prototype for a modern, animated website for Instituto Relva — built with React, TypeScript, and Vite. Features SVG-based physics grass animations, a password-gated access system, and a fully responsive UI.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS + Radix UI + Shadcn/ui components
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Deployment:** Vercel

---

## Features

- **Animated Grass System** — SVG-based grass blade animations with physics-based movement across multiple variants (`shorter`, `taller`, `free`) optimized to 24 FPS
- **Dynamic Color Themes** — Six paired background/accent color schemes switchable at runtime
- **Password Gate** — Session-based authentication protecting all routes
- **About Page** — Hero section with slide-down animation, scroll-to-top, and IntersectionObserver card activation
- **Responsive Design** — Mobile-first with viewport-fit=cover support

---

## Project Structure

```
relva-animation/
├── public/
│   └── images/              # Hero and news images
├── src/
│   ├── assets/
│   │   └── logos/           # SVG logos (wordmark, symbol, icon)
│   ├── components/
│   │   ├── PasswordGate.tsx # Auth wrapper for all routes
│   │   └── ui/              # Shadcn/ui component library
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/
│   │   ├── Home.tsx         # Homepage with animated grass
│   │   └── AboutUs.tsx      # About page
│   ├── App.tsx              # Root component + routing
│   ├── App.css
│   ├── index.css            # Global styles + Tailwind
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.app.json
└── vercel.json
```

### Routes

| Path     | Component   | Description                         |
|----------|-------------|-------------------------------------|
| `/`      | `Home`      | Homepage with animated grass effect |
| `/about` | `AboutUs`   | About page with hero section        |

All routes are wrapped by `PasswordGate`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone <repo-url>
cd relva-animation
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_APP_PASSWORD=your_password_here
```

> **Note:** Never commit `.env.local` to version control. It is already listed in `.gitignore`.

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start the Vite development server  |
| `npm run build` | Type-check and build for production|
| `npm run preview` | Preview the production build     |
| `npm run lint`  | Run ESLint                         |

---

## Deployment

The project is configured for **Vercel** deployment via `vercel.json`. Push to the main branch to trigger an automatic deployment.

Ensure the `VITE_APP_PASSWORD` environment variable is set in the Vercel project settings.
