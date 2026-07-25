# Installation guide

## Prerequisites

- Node.js 20+
- Python 3.11+
- A PostgreSQL database (a free [Neon](https://neon.tech) instance works well for both local dev and production)

## 1. Clone and set up the database

Create a Neon project (or any Postgres instance) and copy its connection string --
you'll need it for both local development and deployment.

## 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env: set DATABASE_URL and a random JWT_SECRET_KEY
# generate a secret with: python -c "import secrets; print(secrets.token_hex(32))"

alembic upgrade head
uvicorn app.main:app --reload
```

API is now running at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

Run the test suite (point `DATABASE_URL` at a disposable database first, since tests write real rows):
```bash
pytest
```

## 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_BASE_URL defaults to http://localhost:8000
npm run dev
```

App is now running at `http://localhost:5173`.

## 4. Verify the full flow

1. Open the app, click "Sign up", create an account
2. Visit any visualizer (e.g. `/sorting/bubble-sort`) and press play
3. Click the "favorite" button in the top right of the visualizer
4. Go to `/dashboard` -- the favorite and a "recently viewed" entry should both appear

If the dashboard doesn't show data, check the browser console for CORS errors --
`CORS_ORIGINS` in the backend `.env` must include your frontend's origin exactly.
