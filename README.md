# JÑĀNĀGNI 2023

The official website for **JÑĀNĀGNI 2023**, a 3-day techno-cultural fest hosted by the Faculty of Engineering & Technology. The site showcases events, a gallery, sponsors, and the organizing team, and includes authentication with an e-pass (QR code) system for registered participants.

Held **30 Nov – 2 Dec** at the Faculty of Engineering & Technology.

## Features

- Landing page with event highlights and gallery
- Event listings with individual event detail pages
- User authentication (Firebase Auth)
- Participant dashboard with a QR-code based e-pass
- Admin dashboard
- Sponsors, Our Team, and About pages

## Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org/) (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State management:** Redux Toolkit + React Redux
- **Backend / Auth:** Firebase (Auth, Firestore, Realtime Database)
- **QR codes:** `qrcode`, `qrcode.react`
- **Notifications:** React Toastify

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)
- A Firebase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/jnanagni23.git
   cd jnanagni23
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables. Copy the example file and fill in your Firebase project values:

   ```bash
   cp .env.example .env
   ```

   Then set each key in `.env`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   ```

   You can find these values in the Firebase console under **Project settings → General → Your apps**.

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script          | Description                                         |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Start the development server                        |
| `npm run build` | Build the app and export a static site (`out/`)     |
| `npm run start` | Start the production server                          |
| `npm run lint`  | Run Next.js linting                                 |

## Project Structure

```
src/
├── components/   Reusable UI components (Header, Footer, Layout, menus)
├── context/      Auth context provider
├── images/       Static image assets (gallery, icons, logos)
├── pages/        Next.js pages (routes)
│   └── event/    Dynamic event detail route [id].tsx
├── store/        Redux store and API slice
└── styles/       Global styles (Tailwind)
```

## Environment Variables

All Firebase config values are read from environment variables (see `firebase.js`). The `.env` file is git-ignored and must never be committed. Use `.env.example` as a template.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
