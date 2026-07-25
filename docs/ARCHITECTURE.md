# Architecture

See the Phase 1 planning document (`dsarena-phase1-architecture.md`, delivered separately)
for the original architecture writeup. This file captures what actually got built and
the key decisions made along the way.

## System overview

Three layers over plain HTTPS + JWT: React/Vite client (Vercel) -> FastAPI (Render) ->
Postgres (Neon). No queue, no cache layer, no microservices -- unnecessary at this scope.

## The generator pattern (the core architectural decision)

Every visualizer -- all ten of them -- is built from the same three pieces:

1. **A generator function** (`function*`) that runs the real algorithm and `yield`s a
   step object at every meaningful moment (a comparison, a swap, a push, a node visit).
   Lives in `frontend/src/algorithms/`.
2. **`useVisualizer`**, a generic hook that runs a generator to completion up front,
   then exposes play/pause/next/prev/reset/speed over the resulting step array.
3. **`VisualizerShell`**, a generic page shell that renders controls, the complexity
   panel, the C++ code panel, and the explanation panel -- and takes one prop, `visual`,
   for the one thing that actually differs per algorithm: how the current step looks.

This is why Phases 2-4 got faster instead of slower: sorting/searching needed bars,
structures needed a stack/queue/list/tree drawing, and graph needed a node-and-edge
layout -- but none of them needed new controls, a new complexity panel, or a new code
panel. Four different `visual` renderers, one shell.

## Favorites & history

`VisualizerShell` calls `useRecordView(slug)` on mount, which POSTs to `/history` if
the user is logged in and silently no-ops otherwise (a missed history row isn't worth
surfacing an error for). The favorite button uses an optimistic update against
`useFavorites`, then reconciles with the server response.

## Known simplifications (deliberate, not oversights)

- **No sidebar.** The spec listed one, but with only four top-level categories a sticky
  navbar covers wayfinding without adding a second nav surface to keep in sync.
- **Structures use scripted demo operations**, not free-form user input (e.g. BST always
  builds from a random insert script, not a value you type in). Fine for demonstrating
  the algorithm; a natural Phase 6 item if you want hands-on manipulation.
- **BFS/DFS run on one fixed 8-node graph**, not arbitrary user-defined graphs. Keeps the
  layout algorithm (simple circular positioning) predictable; a force-directed layout
  would be needed to support arbitrary graphs well.
