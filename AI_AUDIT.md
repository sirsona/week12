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

Parameter route /:id before specific route /stats
