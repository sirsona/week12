# AI AUDIT

## Day 1

## migrate-from-sqlite.js

### Hardcoded connection credentials - **Fixed**

- used environment variables

### Missing error handling - **Fixed**

- used try..catch

## Authentication

No authentication code was implemented.

## Day 2

### 1. PostgreSQL Error Codes - fixed

- Used wrong error code `23500` for unique violation

```javascript
// ❌ Wrong
if (err.code === "23500")

//
if (err.code === "23505")
```

### Invalid UUID Handling - fixed

- Invalid UUID "234590" returned 500 instead of 400

### Route Ordering - fixed

- Parameter route /:id before specific route /stats

## Day 3

## Authentication

### `src/routes/auth.js`

- Handles user signup and login routes with bcrypt password hashing and JWT token generation.

### `src/middleware/requireAuth.js`

- Verifies JWT tokens from Authorization headers and attaches user data to req.user for protected routes.

### `src/middleware/requireRole.js`

- Authorizes routes based on user roles (admin/manager/agent) using role array validation.

### `schema.sql (Users table)`

- Creates users table with UUID, email, password_hash, role, and adds assigned_to foreign key to leads.

### `index.js`

- Mounts auth routes under /auth and applies requireAuth middleware to all /api/leads routes.

## Day 4

### Authentication

- The authentication system uses **JWT (JSON Web Tokens)** with **bcrypt** for password hashing.
- It implements signup/login flow with role-based access control and row-scoped data access.

| File                                            | Purpose                          |
| ----------------------------------------------- | -------------------------------- |
| packages/backend/src/routes/auth.js             | Signup and login endpoints       |
| packages/backend/src/middleware/requireAuth.js  | JWT authentication middleware    |
| packages/backend/src/middleware/requireRole.js  | Role-based authorization         |
| packages/backend/src/services/auth.service.js   | Authentication business logic    |
| packages/backend/src/repositories/users.repo.js | User database queries            |
| packages/backend/tests/auth.test.js             | Authentication integration tests |
