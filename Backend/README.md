# FitFusion Backend

Node.js + Express API powering the FitFusion authentication flow with MongoDB persistence.

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Copy the example environment file and update the values:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Update the `.env` file. At minimum you should provide:
   - `MONGODB_URI` – connection string starting with `mongodb://` or `mongodb+srv://`
   - `CLIENT_URL` – URL used by the frontend (defaults to `http://localhost:5173`)
   - `ALLOWED_ORIGINS` – comma-separated list of URLs permitted by CORS (include your `CLIENT_URL`)
4. Start MongoDB (local instance or Atlas connection string).
5. Run the development server:
   ```powershell
   npm run dev
   ```

The API will be available at `http://localhost:5000` by default.

## Available Scripts

- `npm run dev` – start the server with hot reload (nodemon).
- `npm start` – run the server in production mode.
- `npm run lint` – lint the backend source (requires ESLint config).

## API Routes

| Method | Route            | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Authenticate a user |

All responses return JSON. Validation errors are returned with HTTP 422 and an `errors` array describing the offending fields.
