---
name: chunk-1-setup-server
overview: "Bootstrap a production-minded but simple MVP foundation: Express server, MongoDB connection, health/test route, and minimal role-based frontend scaffold (no business logic yet). Keep architecture modular and ready for Chunk 2 models and Chunk 3+ APIs."
todos:
  - id: init-backend-project
    content: Create backend Node project with Express, Mongoose, dotenv, and start scripts.
    status: completed
  - id: wire-server-db-test-route
    content: Implement app/server split, MongoDB connection, and GET /api/test route with controller.
    status: completed
  - id: scaffold-frontend-role-pages
    content: Create landing page, user and driver dashboard HTML pages, plus minimal shared CSS/JS redirect logic.
    status: completed
  - id: document-run-and-test-steps
    content: Provide setup instructions, API test examples, expected responses, and edge-case verification for Chunk 1.
    status: completed
isProject: false
---

# Chunk 1 Plan: Project Setup + Server

## Scope
Implement only Chunk 1 with a minimal frontend scaffold included:
- Backend: Express app setup, MongoDB (Mongoose) connection, environment config, one test route, and clean modular folder structure.
- Frontend scaffold: landing page + role-based dashboard pages and basic redirect behavior (manual role selection only).

No models, matching, request/route business APIs, auth, or dashboard data logic in this chunk.

## Proposed Folder Structure
- `[backend/package.json](backend/package.json)`
- `[backend/.env.example](backend/.env.example)`
- `[backend/src/server.js](backend/src/server.js)`
- `[backend/src/app.js](backend/src/app.js)`
- `[backend/src/config/db.js](backend/src/config/db.js)`
- `[backend/src/routes/test.routes.js](backend/src/routes/test.routes.js)`
- `[backend/src/controllers/test.controller.js](backend/src/controllers/test.controller.js)`
- `[frontend/index.html](frontend/index.html)`
- `[frontend/assets/css/style.css](frontend/assets/css/style.css)`
- `[frontend/assets/js/main.js](frontend/assets/js/main.js)`
- `[frontend/user/dashboard.html](frontend/user/dashboard.html)`
- `[frontend/driver/dashboard.html](frontend/driver/dashboard.html)`

## Backend Implementation Details
- Use Express with JSON middleware and a versioned API prefix (`/api`).
- Add a single test endpoint (`GET /api/test`) returning service status and timestamp.
- Add MongoDB connection module using Mongoose with clear startup error handling.
- Start server only after successful DB connection (fail-fast if DB unavailable).
- Keep files separated by concern (`app`, `server`, `config`, `routes`, `controllers`) to stay simple and testable.

## Frontend Scaffold Details (Minimal)
- `frontend/index.html`: role selector (User/Driver) and button-driven redirect.
- `frontend/user/dashboard.html`: placeholders for:
  - Create delivery request
  - View own requests
  - View matched drivers
- `frontend/driver/dashboard.html`: placeholders for:
  - Add route
  - View routes
  - View matches
  - Accept/reject matches
- `frontend/assets/js/main.js`: manual redirect logic only (no auth, no API integration yet).
- `frontend/assets/css/style.css`: minimal readable layout styling.

## API Endpoints in Chunk 1
- `GET /api/test`
  - Purpose: verify server boot + route wiring.
  - Response: `{ success: true, message: "Server is running", timestamp: "..." }`

## Testing & Verification Plan (Chunk 1)
- Startup checks:
  - Install dependencies and run backend server.
  - Verify DB connection log appears.
- API test in Postman:
  - Request: `GET http://localhost:<PORT>/api/test`
  - Expect: HTTP 200 with success payload.
- Edge cases:
  - Invalid/missing `MONGO_URI` should fail startup with clear error.
  - DB unavailable should not start server silently.
- Frontend checks:
  - Open `frontend/index.html` and confirm role selection redirects to the correct dashboard page.

## Compatibility for Next Chunks
- Chunk 2 models can be added under `backend/src/models` without restructuring.
- Chunk 3/4 routes can follow existing `routes + controllers` pattern.
- Frontend pages are scaffolded now and can be incrementally wired to APIs later without rewrite.