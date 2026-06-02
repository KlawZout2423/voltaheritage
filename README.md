# Volta Heritage Dance Ensemble (VHDE)

A premium, interactive web application built with **Next.js 16 (App Router)** and **React 19** for the **Volta Heritage Dance Ensemble**, a cultural institution based in Ho, Volta Region, Ghana. 

The site showcases the rich cultural dance, drumming, and weaving traditions of the Ewe people, offering details on cultural categories, upcoming events, news articles, and booking services.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom design tokens
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) (Scroll triggered effects, spring-based layouts, sliding active tabs)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Formatting**: ESLint & TypeScript strictly enforced

---

## 🎨 Cultural Design System

The application features a bespoke, premium design theme utilizing the colors of the Ghana and Volta Region flags, layered over elegant backgrounds and clean typography.

- **Primary Colors**:
  - `Heritage Gold` (`#C8870A`): Representative of wealth, royalty, and tradition.
  - `Heritage Red` (`#B91C1C`): Symbolic of sacrifice, history, and energy.
  - `Heritage Green` (`#166534`): Symbolic of the rich agricultural lands of the Volta.
  - `Heritage Black` (`#1C1208`): Deep charcoal representing identity, strength, and heritage.
- **Typography**:
  - **Headings**: *Playfair Display* — an editorial, high-contrast serif font conveying legacy and storytelling.
  - **Body**: *Inter* — a clean, modern sans-serif font for readability and clarity.
- **Visual Features**:
  - **Kente Accents**: Repeats Ewe Kente weaving color blocks across headers and sections.
  - **Mesh Gradients**: Shifting deep-dark gradients reflecting a modern cinematic atmosphere.
  - **Glassmorphism**: Backdrop blur components for floating overlays and navigation menus.

---

## 🏷️ Rebranded Section Identity

Generic section headers have been rebranded into unique, culturally aligned terms while preserving clear navigation paths:
- `About Us` ➔ **Our Roots** (`/about`)
- `Cultural Heritage` ➔ **Living Archive** (`/heritage`)
- `Upcoming Events` ➔ **In Orbit** (`/events`)
- `Photo Gallery` ➔ **Visions** (`/gallery`)
- `Our Services` ➔ **Offerings** (`/services`)
- `Latest News` ➔ **Blue Spotlight** (`/news`)
- `Contact Us` ➔ **Connect** (`/contact`)

---

## 📂 Project Structure

```
├── public/                 # Static assets (images, logos, etc.)
│   └── images/             # Real performance & workshop photos
├── src/
│   ├── app/                # App Router pages and layouts
│   │   ├── about/          # Our Roots page
│   │   ├── contact/        # Connect (form + trust signals)
│   │   ├── events/         # In Orbit (calendar)
│   │   ├── gallery/        # Visions (interactive masonry filter)
│   │   ├── heritage/       # Living Archive (cultural pillars)
│   │   ├── news/           # Blue Spotlight (articles)
│   │   ├── services/       # Offerings (capabilities & pricing)
│   │   ├── globals.css     # Tailwind v4 configuration & styles
│   │   ├── layout.tsx      # Root HTML layout & font configurations
│   │   └── page.tsx        # Dynamic Home page (Hero, Stats, Welcomes)
│   ├── components/         # Global Shared UI Components
│   │   ├── AnimateOnScroll.tsx  # Scroll-triggered entrance component
│   │   ├── Navbar.tsx      # Animated headers & dropdown lists
│   │   └── Footer.tsx      # Global kente-strip footer
│   └── lib/                # Shared utilities & data feeds
│       ├── data.ts         # Static Ewe data lists (events, news, team)
│       └── types.ts        # TypeScript interface declarations
├── package.json
└── tsconfig.json
```

---

## 🛠️ Getting Started

To run the project locally on your machine, follow these steps:

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live site.

### 3. Build for Production
Compiles the application into a highly optimized static bundle:
```bash
npm run build
```

### 4. Run Lint Checks
Verify codebase formatting and code consistency:
```bash
npm run lint
```

---

## 🤝 Verification

Before pushing code changes to production, ensure:
1. `npm run build` succeeds without compilation, layout, or typing errors.
2. `npm run lint` finishes with no issues.
3. Form submissions and active navbar underline animations function correctly across desktop and mobile responsive viewports.
