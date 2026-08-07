# Revv Clone — React

A self-drive car rental site modelled on [revv.co.in](https://www.revv.co.in/), rebuilt as a
single-page React application.

## Stack

| Concern       | Choice                                    |
| ------------- | ----------------------------------------- |
| Build         | Vite 7                                    |
| UI            | React 19                                  |
| Routing       | React Router 7 (lazy-loaded routes)       |
| Styling       | Tailwind CSS 4 with a custom theme        |
| Animation     | Framer Motion                             |
| Carousels     | Swiper                                    |
| State         | Zustand with `localStorage` persistence   |
| Forms         | React Hook Form                           |
| Icons         | lucide-react                              |
| Notifications | react-hot-toast                           |

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

| Script            | Does                                |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Dev server on http://localhost:5173 |
| `npm run build`   | Production build into `dist/`       |
| `npm run preview` | Serve the production build          |
| `npm run lint`    | ESLint across the project           |

## Environment

Copy `.env.example` to `.env`. Vite only exposes variables prefixed with `VITE_`, and `.env` is
gitignored so local values stay local.

| Variable                    | Purpose                            |
| --------------------------- | ---------------------------------- |
| `VITE_APP_NAME`             | Brand name shown in the UI         |
| `VITE_SUPPORT_PHONE`        | Support number on FAQ and receipts |
| `VITE_SUPPORT_EMAIL`        | Support inbox                      |
| `VITE_API_BASE_URL`         | Reserved for a real backend        |
| `VITE_DEFAULT_CITY`         | Fallback pickup city               |
| `VITE_ENABLE_MOCK_PAYMENTS` | Keeps checkout in demo mode        |

Values are read once in `src/lib/config.js` rather than scattered across components.

## Pages

| Route                  | What it does                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| `/`                    | Hero with booking search, offers, top cars, stats, perks, reviews, FAQs |
| `/cars`                | Filter by body, brand, gearbox, fuel, seats and price; sort and search  |
| `/cars/:carId`         | Gallery, specs, kilometre plans, add-ons, live price breakdown          |
| `/checkout`            | Driver details, payment method, coupons, order summary                  |
| `/booking/:reference`  | Confirmation with receipt                                               |
| `/faq`                 | Searchable, category-filtered accordion                                 |
| `/about`               | Stats, values, timeline                                                 |
| `/login`, `/signup`    | Split-screen auth with validation and password strength                 |
| `*`                    | 404                                                                     |

## Layout

```
src/
  components/
    auth/       shell shared by login and signup
    booking/    the city + date search widget
    cars/       car card and filter panel
    home/       one file per home page section
    layout/     navbar, footer, page shell, breadcrumb header
    ui/         button, badge, accordion, rating, counter, reveal, skeleton
  data/         car catalogue, offers, FAQs, testimonials
  lib/          config, pricing maths, formatting helpers
  pages/        one file per route
  store/        Zustand stores for auth and booking
public/images/  car photography and hero shots
legacy/         the original HTML/CSS/Bootstrap build, kept for reference
```

## Notes

- There is no backend. Accounts, bookings and search state live in `localStorage`, so the demo
  works offline. Passwords are stored unhashed in the browser — fine for a demo, never for
  production.
- Checkout is simulated. No card is charged and no data leaves the browser.
- Prices derive from a single base rate per car in `src/data/cars.js`; the shorter kilometre plans
  are calculated from it so a car's three prices can never drift apart.
- The `legacy/` folder is the previous static site. Its pages reference `./images/`, which now
  lives in `public/`, so those files are an archive rather than a runnable site.
- Photo credits: `public/images/cars/CREDITS.md`.

Not affiliated with Revv. Built as a learning project.
