# Local Transport Optimizer (MVP)

## Chunk 1 Completed Scope
- Express server setup
- MongoDB connection with Mongoose
- Basic modular backend folder structure
- Test route: `GET /api/test`
- Minimal frontend scaffold:
  - `frontend/index.html`
  - `frontend/user/dashboard.html`
  - `frontend/driver/dashboard.html`

## Project Structure
```text
transport_optimizer/
  backend/
    package.json
    .env.example
    src/
      app.js
      server.js
      config/
        db.js
      controllers/
        test.controller.js
      routes/
        test.routes.js
  frontend/
    index.html
    assets/
      css/style.css
      js/main.js
    user/dashboard.html
    driver/dashboard.html
```

## Backend Setup Instructions
1. Open terminal in `backend/`
2. Install dependencies:
   - `npm install`
3. Create `.env` from template:
   - Windows PowerShell: `Copy-Item .env.example .env`
4. Update `.env` if needed:
   - `PORT=5000`
   - `MONGO_URI=mongodb://127.0.0.1:27017/transport_optimizer`
5. Start server:
   - Dev: `npm run dev`
   - Prod-style: `npm start`

## Frontend Setup Instructions
No build step is required.
- Open `frontend/index.html` in browser.
- Select role and click `Continue`.

## API Endpoints (Chunk 1)
### `GET /api/test`
- Purpose: verify server and route wiring.
- Example request:
  - URL: `http://localhost:5000/api/test`
  - Method: `GET`
- Expected response (`200 OK`):
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-21T00:00:00.000Z"
}
```

## Postman Testing Steps
1. Ensure MongoDB is running locally (or use reachable Mongo URI).
2. Start backend server with `npm start` in `backend/`.
3. Open Postman and create a request:
   - Method: `GET`
   - URL: `http://localhost:5000/api/test`
4. Send request and confirm:
   - Status: `200`
   - JSON includes: `success`, `message`, `timestamp`

## Edge Cases to Verify
1. Missing `MONGO_URI`
   - Remove `MONGO_URI` from `.env` and start server.
   - Expected: startup fails with clear error.
2. Invalid or unreachable MongoDB URI
   - Set wrong host/port in `MONGO_URI`.
   - Expected: DB connection fails and server does not continue silently.
3. Wrong API path
   - Call `GET /test` instead of `/api/test`.
   - Expected: `404 Not Found`.

## Notes for Next Chunk
- Chunk 2 can add models under `backend/src/models`.
- Keep route/controller pattern for upcoming request/driver/match modules.
