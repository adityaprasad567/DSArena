# DSArena

A step-through learning platform for ten data structures and algorithms, built for
software engineering interview prep. Every visualizer shares the same play/pause/step/
speed controls, complexity panel, C++ reference implementation, and plain-language
explanation -- see `docs/ARCHITECTURE.md` for how that's built once and reused ten times.

**Status: feature-complete through Phase 5.** All ten visualizers work end to end,
auth is wired, and favorites/history are live on the dashboard.

## Quick start

See `docs/INSTALLATION.md` for full setup. Short version:

```bash
# backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET_KEY
alembic upgrade head
uvicorn app.main:app --reload

# frontend (separate terminal)
cd frontend && npm install
cp .env.example .env
npm run dev
```

## What's implemented

- **Auth** -- register/login/logout, JWT, bcrypt, protected `/dashboard` route
- **Ten visualizers**, each with step mode, play/pause/next/reset, speed control,
  complexity panel (best/average/worst/space), applications, pros/cons, syntax-highlighted
  C++, and a live explanation panel:
  - Sorting: bubble, merge, quick
  - Searching: linear, binary
  - Structures: stack, queue, linked list, BST
  - Graph: BFS, DFS
- **Dashboard** -- real favorites and recently-viewed data from the backend, a
  "continue learning" suggestion, skeleton loaders, empty states
- **Toasts** on favorite/unfavorite
- Page transitions, dark theme with a deliberate design direction (see below)

## Documentation

- `docs/INSTALLATION.md` -- local setup
- `docs/API.md` -- endpoint reference
- `docs/ER_DIAGRAM.md` -- database schema
- `docs/ARCHITECTURE.md` -- what got built and why, including known simplifications
- `docs/DEPLOYMENT.md` -- Neon + Render + Vercel deploy steps

## Design direction

Dark ink background, amber "signal" accent for active/comparing state, jade for
sorted/visited state, monospace for anything data-shaped (indices, complexity labels,
step counters). Space Grotesk for display type. The landing page's "step tape" motif
recurs as the actual state-coloring system inside every visualizer.

## Known simplifications

Documented in full in `docs/ARCHITECTURE.md`, briefly: no sidebar (a navbar covers four
categories fine), structures build from scripted demo operations rather than free-form
input, and BFS/DFS run on one fixed demo graph rather than arbitrary user graphs. None
of these block the core learning experience; all are reasonable Phase 6 candidates if
you want to extend it further.
