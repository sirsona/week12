# Git Hooks - Reflection

## What problems do pre-commit hooks solve?

- Pre-commit hooks help catch problems before code is committed to the repository.
- They automatically format code, run quality checks, and enforce project standards, reducing mistakes and improving consistency.

## What is the cost of a slow pre-commit hook?

- A slow pre-commit hook can interrupt the development workflow and reduce productivity.
- If commits take too long, developers may become frustrated and commit less frequently.

## When should you use `git commit --no-verify` and when should you never?

- `git commit --no-verify` should only be used when a hook is broken or when an urgent fix cannot wait.
- It should never be used to bypass formatting, linting, or tests just to avoid fixing issues.

## What would you add next?

- I would add ESLint to enforce coding standards.
- I would add a pre-push hook to run the test suite before code is pushed.
- I would also add a security scan to detect vulnerable dependencies early in the development process.
