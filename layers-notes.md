# Layer Notes

## What is the rule for "what can each layer know about"?

### Route

- A route should only know about HTTP requests and responses.
- It should receive the request, call the service, and return the response.

### Service

- A service contains the business logic.
- It decides what should happen, validates data, and calls one or more repositories when needed.

### Repository

- A repository should only know about the database.
- It runs SQL queries and returns data without knowing anything about Express or HTTP.

## Why should repositories never format HTTP responses?

- Repositories should never format HTTP responses because they are only responsible for reading and writing data.
- Returning `res.json()` from a repository would mix database code with web code.

## Why should routes never write SQL directly?

- Routes should never write SQL directly because it makes the code harder to maintain and reuse.
- Keeping SQL in repositories makes it easier to update queries without changing the routes.
