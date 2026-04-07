# Bookshelf — React Frontend

A React + TypeScript frontend for tracking your reading list. Connects to the [Bookshelf API](https://github.com/ishandahal/bookshelf-api).

## Tech stack

- [React 19](https://react.dev/) — UI components
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Vite](https://vite.dev/) — dev server and build tool
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) — unit tests

## Setup

```bash
npm install
```

Copy the example env file and set your API URL:

```bash
cp .env.example .env
```

`.env`:
```
VITE_API_URL=http://localhost:8000
```

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm test         # run tests in watch mode
npm run build    # type-check and build for production
npm run lint     # run ESLint
```

## Project structure

```
src/
├── api.ts                  # HTTP layer — all fetch calls live here
├── auth.ts                 # localStorage token helpers
├── types.ts                # shared TypeScript interfaces
├── App.tsx                 # root component — state and handlers
├── main.tsx                # app entry point, mounts AuthProvider
├── context/
│   └── AuthContext.tsx     # global auth state (isLoggedIn, login, logout)
└── components/
    ├── AddBookForm.tsx      # controlled form for adding a book
    ├── BookCard.tsx         # single book — view and inline edit modes
    ├── BookList.tsx         # renders list of BookCards, empty state
    ├── ErrorMessage.tsx     # displays API errors
    └── LoginForm.tsx        # username/password login form
```

## Auth flow

1. User submits `<LoginForm>` with username and password
2. `POST /auth/login` returns a JWT token
3. Token is stored in `localStorage`
4. Every subsequent API request includes `Authorization: Bearer <token>`
5. On logout (or 401 response), token is removed and the login form is shown

## Deployment

Deployed to [Vercel](https://vercel.com). Set the following environment variable in the Vercel dashboard:

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL of the deployed API, e.g. `https://your-api.onrender.com` |
