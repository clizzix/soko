# Soko

Soko is a React + TypeScript web app for discovering and sharing local activities. Users can browse activities on an interactive map, search by title, description, or category, and save favorites to their profile.

## Current Features

- **Authentication** — signup, login, and protected routes via a React context-based auth flow
- **Activities** — create, edit, delete, and view activity details (title, description, category, location, date)
- **Search** — filter activities by title, description, or category tag through a dedicated search bar
- **Map view** — Mapbox-powered interactive map with location search for picking and displaying activity locations
- **Favorites** — logged-in users can favorite activities and review them on a dedicated page
- **Profile** — per-user profile page listing the user's own activities

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router 7
- **Styling:** Tailwind CSS 4 with daisyUI
- **Forms & validation:** React Hook Form + Zod
- **Maps:** Mapbox GL, react-map-gl, `@mapbox/search-js-react`
- **HTTP:** Axios (services split under `src/api/`)
- **Notifications:** react-toastify

## Project Structure

```
src/
├── api/          # Axios client and service modules (activities, users, favorites)
├── components/   # Reusable UI (Navbar, Header, ActivityCard, Searchbar, MapView, ...)
├── context/      # AuthContext
├── layout/       # MainLayout wrapping routed pages
├── pages/        # Home, Login, Signup, Profile, Favorites, ActivityDetails, Create/EditActivity
├── schemas/      # Zod validation schemas
└── types/        # Shared TypeScript types
```

## Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # preview production build
```
