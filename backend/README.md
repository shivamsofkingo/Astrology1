# Backend

This Express API uses Sequelize with MySQL. Its current structure is:

```text
backend/
  config/db.js                 Database configuration
  controllers/adminController.js
  middleware/authMiddleware.js
  models/User.js
  routes/adminRoutes.js
  server.js
```

## Setup

1. Install dependencies with `npm install` from this directory.
2. Copy `.env.example` to `.env` and set a unique `JWT_SECRET`, admin credentials,
   and the MySQL connection settings. Keep `.env` private and out of version control.
3. Create the database and provision its `users` table to match `models/User.js`.
   The API does not automatically create or alter database tables.
4. Start the API with `npm run dev` (or `npm start`).

The server verifies the database connection before it starts listening.

## Endpoints

- `POST /api/login` — accepts `{ "email": "...", "password": "..." }` and returns
  a signed admin JWT.
- `GET /api/users?page=1&limit=20&search=...` — lists users and requires
  `Authorization: Bearer <token>`.
- `POST /api/logout` — stateless JWT logout is handled by deleting the token on
  the client.
