# Bookshelf App

Frontend for the [Bookshelf API](https://github.com/ishandahal/bookshelf-api) — a personal reading list tracker.

## Repo structure

```
bookshelf-app/
├── frontend/           # Phase 1 — plain HTML + vanilla JS
└── frontend-react/     # Phase 2/3 — React + TypeScript (active)
```

`frontend/` was built first to understand the fundamentals: HTTP requests, JSON handling, and CORS.
`frontend-react/` is the current application, rebuilt with React and extended with JWT authentication.

## Running locally

You need the API running before starting the frontend.

**Start the API** (see [bookshelf-api](https://github.com/ishandahal/bookshelf-api)):
```bash
cd path/to/bookshelf-api
ADMIN_USERNAME=admin ADMIN_PASSWORD=password SECRET_KEY=dev-secret \
  uv run uvicorn bookshelf_api.routes:app --reload
```

**Start the frontend:**
```bash
cd frontend-react
npm install
npm run dev
```

Open `http://localhost:5173`. Sign in with the credentials you set above.

## Deployment

The React frontend is deployed to [Vercel](https://vercel.com).

Set the `VITE_API_URL` environment variable in Vercel to point to your deployed API URL.
