# Todo Tracker

A full-stack Todo Tracker application with a **REST API backend** and a frontend to consume it.

---

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **ORM:** Sequelize v6
- **Database:** SQLite

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React hooks (custom `useTodos` hook)

---

## Project Structure

```
TodoTracker/
├── backend/
│   ├── index.js                 # Express app entry point
│   ├── config/
│   │   └── config.json          # Sequelize database configuration
│   ├── controllers/
│   │   └── todoController.js    # CRUD logic with validation & error handling
│   ├── middleware/
│   │   └── errorHandler.js      # Centralized error-handling middleware
│   ├── migrations/
│   │   └── 20260303180517-create-todo.js
│   ├── models/
│   │   ├── index.js             # Sequelize model loader
│   │   └── todo.js              # Todo model definition
│   ├── routes/
│   │   └── todoRoutes.js        # Express router for /todos
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page (server component)
│   │   └── globals.css          # Global styles (Tailwind)
│   ├── components/
│   │   ├── TodoPage.tsx         # Main page — wires hooks to UI
│   │   ├── Sidebar.tsx          # Left sidebar with navigation & stats
│   │   ├── TodoForm.tsx         # Inline "Add New Task" form
│   │   ├── TodoItem.tsx         # Single todo row (clickable)
│   │   ├── TodoList.tsx         # Todo list with loading/error/empty states
│   │   └── TodoDetailDrawer.tsx # Right drawer — view/edit/delete (uses getById)
│   ├── hooks/
│   │   ├── useTodos.ts          # Custom hook — list state & CRUD actions
│   │   └── useTodoDetail.ts     # Custom hook — single todo detail (getById)
│   ├── services/
│   │   └── todoService.ts       # API calls (data layer)
│   ├── types/
│   │   └── todo.ts              # TypeScript interfaces
│   ├── .env.example             # Environment variable template
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Backend Setup

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

The API server will start on **http://localhost:3001**.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:3000**.

> Make sure the backend is running before starting the frontend. The frontend reads the API URL from
`.env.local` (see `.env.example` for the template).

---

## API Endpoints

| Method   | Endpoint     | Description       |
|----------|--------------|-------------------|
| `GET`    | `/todos`     | List all todos    |
| `POST`   | `/todos`     | Create a new todo |
| `GET`    | `/todos/:id` | Get a single todo |
| `PUT`    | `/todos/:id` | Update a todo     |
| `DELETE` | `/todos/:id` | Delete a todo     |

### Todo Fields

| Field         | Type     | Required | Default |
|---------------|----------|----------|---------|
| `id`          | Integer  | Auto     | —       |
| `title`       | String   | Yes      | —       |
| `description` | String   | No       | `null`  |
| `completed`   | Boolean  | No       | `false` |
| `createdAt`   | DateTime | Auto     | —       |
| `updatedAt`   | DateTime | Auto     | —       |

### Example Requests

**Create a todo:**

```bash
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Update a todo:**

```bash
curl -X PUT http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a todo:**

```bash
curl -X DELETE http://localhost:3001/todos/1
```

### Error Responses

- **400 Bad Request** — Validation errors (e.g., empty title)
- **404 Not Found** — Todo with the given ID does not exist
- **500 Internal Server Error** — Unexpected server errors

---

## Validation & Error Handling

- `title` is **required** and cannot be empty (enforced at the model level via Sequelize
  validations).
- All endpoints return consistent JSON error responses.
- A centralized error-handling middleware catches unhandled exceptions and returns structured error
  responses.
- In development mode, error stack traces are included in the response for easier debugging.

---

## Design Decisions

1. **Express.js v5** — Chosen for its native async error handling support, reducing boilerplate
   try/catch in route handlers.
2. **Sequelize ORM** — Provides a clean abstraction over SQL, with built-in model validations (e.g.,
   `notEmpty` on `title`), migrations for schema versioning, and easy swappability between
   databases.
3. **SQLite** — A lightweight, file-based database ideal for development and small-scale
   deployments — no external database server required.
4. **Centralized error-handling middleware** — All unhandled errors flow through a single middleware
   that returns consistent JSON error responses, with stack traces included in development mode for
   easier debugging.
5. **Separation of concerns** — The codebase is organized into `models/`, `controllers/`, `routes/`,
   and `middleware/` to keep responsibilities clear and the project maintainable as it grows.
6. **Model-level validation** — Validation rules (e.g., `title` required, cannot be empty) are
   enforced at the Sequelize model level, ensuring data integrity regardless of how the model is
   used.
7. **CORS enabled** — Configured from the start to allow the frontend (served from a different
   origin) to consume the API without cross-origin issues.
8. **Next.js App Router** — Uses the latest Next.js App Router architecture. The page is a server
   component that renders a client component, following the recommended pattern.
9. **UI / Data logic separation** — API calls live in `services/todoService.ts` (pure data layer),
   state management lives in `hooks/useTodos.ts` and `hooks/useTodoDetail.ts` (business logic), and
   components in `components/` (UI only). This makes each layer independently testable and
   replaceable.
10. **Tailwind CSS v4** — Utility-first CSS for rapid, consistent styling without writing custom CSS
    files. Keeps styles co-located with markup.
11. **3-panel layout** — Sidebar (navigation & stats) + center list (todos) + right drawer (detail
    view). Clicking a todo calls `GET /todos/:id` to fetch full details, demonstrating the full CRUD
    lifecycle including the "read one" endpoint.

---

## Possible Improvements

- **Authentication & Authorization** — Add user accounts (e.g., JWT-based auth) so each user manages
  their own todos.
- **Pagination & Filtering** — Implement query parameters for pagination (`?page=1&limit=10`),
  filtering by `completed` status, and searching by `title`.
- **Input sanitization** — Add a library like `express-validator` for more robust request validation
  and sanitization beyond Sequelize model validations.
- **Rate limiting** — Protect the API from abuse with rate-limiting middleware (e.g.,
  `express-rate-limit`).
- **Logging** — Integrate a structured logging library (e.g., `winston` or `pino`) instead of
  `console.log`/`console.error`.
- **Testing** — Add unit and integration tests using Jest and Supertest to ensure API correctness
  and prevent regressions.
- **Soft deletes** — Use Sequelize's `paranoid` mode to soft-delete todos instead of permanently
  removing them.
- **Due dates & priorities** — Extend the Todo model with `dueDate` and `priority` fields for richer
  task management.
- **Deployment** — Containerize with Docker and add a CI/CD pipeline for automated testing and
  deployment.

---

## Notes

- The backend uses **Sequelize models and migrations** for database schema management.
- CORS is enabled to allow frontend consumption from a different origin.
- The server uses `sequelize.sync()` on startup to ensure tables exist, in addition to supporting
  the CLI migration workflow.

