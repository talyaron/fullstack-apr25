# Todo App with Users

A full-stack todo list application with user management built with Node.js, Express, MongoDB (Mongoose), and vanilla TypeScript.

## Features

- User management (Create, Read, Delete)
- Task management (Create, Read, Update, Delete)
- Tasks are associated with users
- Filter tasks by completion status
- Priority levels for tasks (1-5)
- Responsive design

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Update the MongoDB connection string in `.env` file if needed:
```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=3000
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user
- `DELETE /api/users/:id` - Delete a user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/users/:userId/tasks` - Get all tasks for a specific user

## Usage

1. **Add a User**: Enter name and email in the Users section
2. **Select a User**: Click on a user to select them
3. **Add Tasks**: Once a user is selected, add tasks with title, description, and priority level
4. **Manage Tasks**: Toggle completion status or delete tasks
5. **Filter Tasks**: Use the "Show Completed" checkbox to filter tasks

## Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, TypeScript
- **Frontend**: Vanilla TypeScript, HTML, CSS
- **Architecture**: RESTful API with server-side rendering