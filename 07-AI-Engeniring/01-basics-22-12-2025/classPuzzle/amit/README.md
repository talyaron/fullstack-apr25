# Full-Stack Todo List Application ✨

A beautiful, modern, and production-grade Todo List application with stunning animations and gradients!

Built with React, Zustand, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Authentication**: Secure JWT authentication with HttpOnly cookies and bcrypt password hashing
- **Task Management**: Full CRUD operations with soft delete
- **Search & Filter**: Filter tasks by title and priority
- **Dark Mode**: Toggle between dark and light themes with localStorage persistence
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Form Validation**: React Hook Form with comprehensive validation messages
- **Inline Editing**: Edit tasks directly from the detail view
- **Skeleton Loading**: Smooth loading states with Tailwind animations

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt for password hashing
- TypeScript

### Frontend
- React 18 with Vite
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form
- React Router v6
- Axios

## Project Structure

```
amit/
├── server/              # Backend API
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── models/     # Mongoose models (User, Task)
│   │   ├── routes/     # API routes (auth, tasks)
│   │   ├── middleware/ # Auth middleware
│   │   ├── utils/      # JWT utilities
│   │   └── server.ts   # Express server
│   ├── package.json
│   └── tsconfig.json
│
└── client/             # Frontend React app
    ├── src/
    │   ├── api/        # Axios configuration
    │   ├── components/ # React components
    │   ├── contexts/   # Theme context
    │   ├── pages/      # Page components
    │   ├── store/      # Zustand stores
    │   ├── types/      # TypeScript types
    │   ├── App.tsx     # Main app component
    │   └── main.tsx    # Entry point
    ├── package.json
    └── tsconfig.json
```

## Database Schema

### Users Collection
```typescript
{
  username: String (unique, min 3 chars)
  password: String (hashed, min 6 chars)
  createdAt: Date
  updatedAt: Date
}
```

### Tasks Collection
```typescript
{
  user_id: ObjectId (ref: User)
  title: String (required)
  description: String
  status: Boolean (default: false)
  priority: Enum ['low', 'medium', 'high']
  due_date: Date (nullable)
  deleted_at: Date (nullable, for soft delete)
  createdAt: Date
  updatedAt: Date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB
If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas and update the `MONGODB_URI` in `.env`

### 4. Start the Backend Server
```bash
cd server
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000)

### 5. Install Client Dependencies
```bash
cd client
npm install
```

### 6. Start the Frontend
```bash
cd client
npm run dev
```

The client will run on [http://localhost:5173](http://localhost:5173)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with optional search and priority filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Soft delete task

## Features Breakdown

### Navigation
- **Top Navbar**: Displays "Hello [Username]" on the left
- **Burger Menu**: 3-line menu icon on the right that opens a dropdown with:
  - Settings label
  - Dark/Light mode toggle
  - Logout button

### Task Management
- Tasks are sorted by `due_date` (ascending)
- Search by title (case-insensitive)
- Filter by priority (low, medium, high)
- Quick delete button on each task card
- Click task to view details
- Inline editing in detail view

### UI/UX
- Validation errors displayed directly below input fields
- Skeleton screens with Tailwind `animate-pulse` while loading
- Fully responsive (mobile-first approach)
- Dark mode preference saved in localStorage
- Color-coded priority badges

### Soft Delete
- Tasks are not permanently deleted
- `deleted_at` timestamp is set instead
- Deleted tasks are filtered out from queries

## Usage

1. **Register**: Create a new account with username and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Click "Add New Task" to create a todo
4. **Edit Tasks**: Click on a task, then click "Edit" to modify
5. **Delete Tasks**: Use the delete button on cards or in detail view
6. **Search/Filter**: Use the search bar and priority dropdown
7. **Toggle Theme**: Click the burger menu and select your preferred theme

## Build for Production

### Build Backend
```bash
cd server
npm run build
npm start
```

### Build Frontend
```bash
cd client
npm run build
npm run preview
```

## License
MIT
