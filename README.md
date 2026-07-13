# WhatsApp CRM

A simple WhatsApp CRM built with Node.js, Express, React, and PostgreSQL. It receives WhatsApp messages through the Meta WhatsApp Cloud API, stores leads and conversations, and provides a web dashboard for sales representatives to manage customer inquiries.

## Features

- WhatsApp Cloud API integration
- Lead and conversation management
- PostgreSQL database
- JWT authentication
- React dashboard
- Git hooks with Husky, Prettier, and Commitlint

## Developer Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git (v2.13 or higher)

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/sirsona/week12.git
cd week12
```

2. Install project dependencies:

```bash
npm install
```

Installing dependencies also installs the Husky Git hooks, so no additional setup is required.

### Running the Application

Start the development servers from the project root:

```bash
# Start both backend and frontend
npm run dev
```

### Git Hooks

This project uses **Husky** to run Git hooks automatically.

- **Pre-commit:** Runs **lint-staged** and formats staged files using **Prettier**.
- **Commit-msg:** Uses **Commitlint** to enforce Conventional Commit messages.

### Conventional Commit Examples

Valid commit messages include:

```text
feat: add authentication middleware
fix: resolve login validation bug
docs: update README
style: format dashboard component
refactor: simplify leads service
test: add auth integration tests
chore: update dependencies
```

Commits that do not follow the Conventional Commits format will be rejected until the message is corrected.
