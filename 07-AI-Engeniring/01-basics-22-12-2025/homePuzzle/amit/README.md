# Station Zero - Adventure/Escape Game

A high-quality, full-stack adventure/escape game where players solve coding puzzles to progress through rooms and unlock the mysteries of Station Zero.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Redux Toolkit for state management
- React Router for routing and navigation
- SCSS Modules for styling
- Framer Motion for animations
- Axios for API communication

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- vm2 for secure code execution sandboxing

## Project Structure

```
amit/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   └── auth/       # Authentication components
│   │   ├── pages/          # Page components (Login, Game)
│   │   ├── store/          # Redux store and slices
│   │   ├── services/       # API services
│   │   ├── styles/         # SCSS files and variables
│   │   └── App.tsx         # Main app with routing
│   └── package.json
│
└── server/                  # Express backend
    ├── src/
    │   ├── config/         # Database configuration
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Auth middleware
    │   ├── models/         # MongoDB models
    │   ├── routes/         # API routes
    │   ├── utils/          # Utility functions
    │   └── server.ts       # Server entry point
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or remote)
- npm or yarn

### Installation

1. Install server dependencies:
```bash
cd server
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
```

3. Configure environment variables:

Server (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/station-zero
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Client (.env):
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend client:
```bash
cd client
npm run dev
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:5000`.

## Features (Step 1 Complete)

### Architecture
- Monorepo structure with separate client and server
- React Router with protected routes
- Separation of concerns (pages, components, services)
- Professional routing architecture

### Backend
- User authentication with JWT
- MongoDB models for User, Room, and Puzzle
- RESTful API with Express
- Secure middleware for route protection

### Frontend
- Redux store with game state management
- Protected routes with authentication guards
- Dark theme with SCSS modules
- API service for backend communication
- Auto-login for returning players via localStorage token
- Beautiful, themed Login and Game pages

## Routes

### Client Routes
- `/` - Redirects to login
- `/login` - Login/registration page (public)
- `/game` - Main game interface (protected)
- All other routes redirect to `/login`

### API Endpoints

#### Authentication
- `POST /api/auth/check-user` - Login or register a user
- `GET /api/auth/me` - Get current user (requires authentication)

#### Health Check
- `GET /api/health` - Server health status

## Next Steps

Future development will include:
- Room navigation system
- Puzzle solving interface with code editor
- Code execution sandbox using vm2
- Inventory management
- Progressive puzzle difficulty
- Achievement system
- Multiplayer features

## License

ISC
