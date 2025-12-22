# Space-Themed Task Management App - Implementation Plan

## Overview
Build a production-grade MERN stack Task Management application with a galactic/space aesthetic, featuring JWT authentication, full CRUD operations, and shared TypeScript schemas using Valibot.

---

## Phase 1: Project Setup & Structure

### 1.1 Initialize Monorepo Structure
- [ ] Create root project folder with `client/`, `server/`, and `shared/` directories
- [ ] Initialize root `package.json` with workspaces configuration
- [ ] Set up root `.gitignore` and `.editorconfig`

### 1.2 Shared Package Setup
- [ ] Initialize `shared/` with TypeScript configuration
- [ ] Create `shared/schemas/` directory for Valibot schemas
- [ ] Implement `ResultsSettings` schema (resultsBy, cutoffNumber, cutoffBy, etc.)
- [ ] Create shared types for User, Task, and API responses
- [ ] Export all schemas and types from `shared/index.ts`

### 1.3 Server Setup
- [ ] Initialize Express server with TypeScript
- [ ] Configure `tsconfig.json` to import from `shared/`
- [ ] Set up folder structure: `routes/`, `controllers/`, `models/`, `middleware/`, `utils/`
- [ ] Install dependencies: express, mongoose, jsonwebtoken, bcrypt, valibot, cors, cookie-parser
- [ ] Create environment configuration (`.env` with MongoDB URI, JWT_SECRET, etc.)

### 1.4 Client Setup
- [ ] Initialize React 18 with Vite and TypeScript
- [ ] Configure `tsconfig.json` to import from `shared/`
- [ ] Install dependencies: react-redux, @reduxjs/toolkit, tailwindcss, react-router-dom
- [ ] Set up folder structure: `components/`, `pages/`, `store/`, `hooks/`, `styles/`
- [ ] Configure Tailwind CSS with space-theme custom colors

---

## Phase 2: Backend Implementation

### 2.1 Database & Models
- [ ] Create MongoDB connection utility
- [ ] Implement User model (username, password hash, createdAt)
- [ ] Implement Task model with ResultsSettings integration
- [ ] Add proper TypeScript types for all models

### 2.2 Validation Middleware
- [ ] Create reusable Valibot validation middleware for Express
- [ ] Implement `validateBody()` middleware
- [ ] Implement `validateParams()` middleware
- [ ] Add proper error formatting for validation failures

### 2.3 Authentication System
- [ ] Create auth routes (`/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`)
- [ ] Implement password hashing with bcrypt
- [ ] Set up JWT generation with HttpOnly cookies
- [ ] Create `authMiddleware` for protected routes
- [ ] Implement token refresh logic (optional)

### 2.4 Task CRUD API
- [ ] Create task routes with validation
- [ ] `POST /api/tasks` - Create task with ResultsSettings
- [ ] `GET /api/tasks` - List user's tasks
- [ ] `GET /api/tasks/:id` - Get single task
- [ ] `PUT /api/tasks/:id` - Update task
- [ ] `DELETE /api/tasks/:id` - Delete task
- [ ] Ensure all routes are protected by authMiddleware

### 2.5 Error Handling
- [ ] Create centralized error handler middleware
- [ ] Define custom error classes (ValidationError, AuthError, NotFoundError)
- [ ] Implement consistent error response format

---

## Phase 3: Frontend Implementation

### 3.1 Redux Store Setup
- [ ] Configure Redux store with RTK
- [ ] Create `authSlice` for user state
- [ ] Set up RTK Query API base configuration
- [ ] Create `authApi` with login, register, logout mutations
- [ ] Create `tasksApi` with CRUD operations and tag-based invalidation

### 3.2 Authentication UI
- [ ] Create `LoginPage` component with form validation
- [ ] Create `RegisterPage` component with form validation
- [ ] Implement form validation using shared Valibot schemas
- [ ] Create `ProtectedRoute` wrapper component
- [ ] Add auth state persistence check on app load

### 3.3 Task Management UI
- [ ] Create `TaskListPage` - display all tasks with loading/error states
- [ ] Create `TaskCard` component with glassmorphism styling
- [ ] Create `TaskForm` component for create/edit with ResultsSettings fields
- [ ] Create `TaskDetailPage` for viewing single task
- [ ] Implement task filtering/sorting UI

### 3.4 Error Boundaries
- [ ] Create root `ErrorBoundary` component
- [ ] Create page-level error boundaries
- [ ] Implement fallback UI for error states

---

## Phase 4: Space Theme & Styling

### 4.1 Tailwind Configuration
- [ ] Define custom color palette (Deep Indigo, Obsidian, Cosmic Purple, Stellar Cyan)
- [ ] Add glassmorphism utility classes
- [ ] Configure dark/light theme variables
- [ ] Add glow effect utilities

### 4.2 Theme Provider
- [ ] Create ThemeContext with dark/light toggle
- [ ] Persist theme preference to localStorage
- [ ] Create `ThemeToggle` component

### 4.3 UI Components
- [ ] Design and build `Navbar` with space aesthetic
- [ ] Create `Button` variants with glow effects
- [ ] Create `Input` components with cosmic styling
- [ ] Create `Card` component with glassmorphism
- [ ] Add cosmic background (gradients, stars animation)
- [ ] Implement responsive layouts

---

## Phase 5: Testing & Polish

### 5.1 Testing
- [ ] Add unit tests for validation middleware
- [ ] Add unit tests for auth logic
- [ ] Test protected routes
- [ ] Test RTK Query cache invalidation

### 5.2 Final Polish
- [ ] Add loading spinners with space theme
- [ ] Implement toast notifications for success/error
- [ ] Add smooth page transitions
- [ ] Verify responsive design on mobile
- [ ] Code cleanup and documentation

---

## File Structure

```
space-task-manager/
├── shared/
│   ├── package.json
│   ├── tsconfig.json
│   ├── index.ts
│   ├── schemas/
│   │   ├── resultsSettings.schema.ts
│   │   ├── task.schema.ts
│   │   ├── user.schema.ts
│   │   └── index.ts
│   └── types/
│       ├── task.types.ts
│       ├── user.types.ts
│       └── api.types.ts
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── models/
│   │   │   ├── User.model.ts
│   │   │   └── Task.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── task.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validate.middleware.ts
│   │   │   └── error.middleware.ts
│   │   └── utils/
│   │       └── jwt.ts
│   └── .env
├── client/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── store/
│       │   ├── store.ts
│       │   ├── authSlice.ts
│       │   └── api/
│       │       ├── baseApi.ts
│       │       ├── authApi.ts
│       │       └── tasksApi.ts
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   ├── TaskListPage.tsx
│       │   └── TaskDetailPage.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── TaskCard.tsx
│       │   ├── TaskForm.tsx
│       │   ├── ThemeToggle.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── ui/
│       │       ├── Button.tsx
│       │       ├── Input.tsx
│       │       └── Card.tsx
│       ├── context/
│       │   └── ThemeContext.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       └── styles/
│           └── globals.css
└── package.json (root workspace config)
```

---

## Key Implementation Notes

1. **Monorepo Imports**: Configure TypeScript paths so both `client` and `server` can import from `shared` using aliases like `@shared/`

2. **Valibot Middleware Pattern**:
   ```typescript
   export const validate = (schema: BaseSchema) =>
     (req, res, next) => {
       const result = safeParse(schema, req.body);
       if (!result.success) return res.status(400).json({ errors: result.issues });
       req.body = result.output;
       next();
     };
   ```

3. **RTK Query Tags**: Use tags like `['Task']` and `['TaskList']` for proper cache invalidation on mutations

4. **Space Theme Colors**:
   - Primary: Deep Indigo (`#1e1b4b`)
   - Secondary: Obsidian (`#0f0f23`)
   - Accent: Stellar Cyan (`#22d3ee`)
   - Glow: Cosmic Purple (`#a855f7`)

5. **Glassmorphism CSS**:
   ```css
   .glass {
     background: rgba(255, 255, 255, 0.1);
     backdrop-filter: blur(10px);
     border: 1px solid rgba(255, 255, 255, 0.2);
   }
   ```
