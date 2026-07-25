# API documentation

Base URL: `http://localhost:8000` locally, or your Render service URL in production.
Interactive docs (Swagger UI) are auto-generated at `/docs`.

Auth endpoints return/require a JWT sent as `Authorization: Bearer <token>`.

## Auth

### `POST /register`
Create an account.

Request:
```json
{ "username": "ada", "email": "ada@example.com", "password": "supersecret123" }
```
Response `201`:
```json
{ "id": "uuid", "username": "ada", "email": "ada@example.com", "created_at": "2026-07-12T00:00:00Z" }
```
`400` if the email or username is already taken.

### `POST /login`
Request:
```json
{ "email": "ada@example.com", "password": "supersecret123" }
```
Response `200`:
```json
{ "access_token": "eyJ...", "token_type": "bearer" }
```
`401` on incorrect credentials.

### `GET /me`
Requires auth. Returns the current user's profile.

## Algorithms

### `GET /algorithms`
No auth required. Returns the static catalog of all ten visualizers:
```json
[{ "slug": "bubble-sort", "name": "Bubble sort", "category": "sorting" }, ...]
```
This is static metadata shipped with the code, not stored in the database.

## Activity (favorites & history)

All endpoints below require auth.

### `POST /favorite`
Toggles a favorite: adds it if not already favorited, removes it if it is.

Request: `{ "algorithm_slug": "bubble-sort" }`
Response: the created favorite object, or `null` if this call removed an existing one.

### `GET /favorites`
Returns the current user's favorites, most recently added first.

### `POST /history`
Records a view. Called automatically by the frontend whenever a logged-in user opens a visualizer page.

Request: `{ "algorithm_slug": "bubble-sort" }`
Response: the created history row.

### `GET /history?limit=10`
Returns the current user's most recent views, newest first. `limit` defaults to 10, max 50.

## Error format

FastAPI's default error shape:
```json
{ "detail": "Incorrect email or password" }
```
Validation errors (`422`) include a `detail` array with per-field messages.
