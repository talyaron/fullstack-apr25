# Station Zero - Architecture Overview

## Routing & Navigation Architecture

### Why React Router with Protected Routes?

The application uses React Router with a protected route pattern for several key reasons:

1. **Separation of Concerns**: Authentication logic is separated from business logic
2. **Scalability**: Easy to add new protected/public routes as the game grows
3. **User Experience**: Proper browser history, deep linking, and navigation
4. **Security**: Centralized route guards prevent unauthorized access
5. **Maintainability**: Clean, declarative routing structure

### Route Structure

```typescript
/ (root)                    → Redirects to /login
/login                      → Public - Login/Registration page
/game                       → Protected - Main game interface
* (any other route)         → Redirects to /login
```

### Protected Route Implementation

**ProtectedRoute Component** ([ProtectedRoute.tsx](client/src/components/auth/ProtectedRoute.tsx))
- Checks Redux store for authentication state
- Redirects unauthenticated users to `/login`
- Wraps protected components/pages
- Prevents unauthorized access client-side

### Authentication Flow

1. **Initial Load**:
   - App checks localStorage for existing token
   - If found, validates with backend (`/api/auth/me`)
   - Auto-populates Redux store with user data
   - Redirects to appropriate route based on auth state

2. **Login**:
   - User enters username on Login page
   - API call to `/api/auth/check-user`
   - Token stored in localStorage + Redux
   - Automatic redirect to `/game`

3. **Session Persistence**:
   - Token persists in localStorage
   - Returning users auto-login
   - Invalid tokens trigger cleanup and redirect

4. **Logout**:
   - Clears Redux state
   - Removes token from localStorage
   - Redirects to `/login`

## Component Architecture

### Pages
- **Login** ([Login.tsx](client/src/pages/Login.tsx))
  - Handles authentication
  - Form validation
  - Auto-redirects if already authenticated
  - Beautiful themed UI with SCSS modules

- **Game** ([Game.tsx](client/src/pages/Game.tsx))
  - Main game interface
  - Displays player stats
  - Protected by ProtectedRoute
  - Shows current room, inventory, score

### Components
- **ProtectedRoute** ([ProtectedRoute.tsx](client/src/components/auth/ProtectedRoute.tsx))
  - Route guard component
  - Checks authentication before rendering children
  - Redirects unauthorized users

## State Management

### Redux Store Structure

```typescript
game: {
  id: string | null
  username: string | null
  currentRoom: Room | null
  score: number
  inventory: Item[]
  completedPuzzles: string[]
  isAuthenticated: boolean
  token: string | null
}
```

### Key Actions
- `setPlayer` - Update player state
- `setAuthentication` - Set auth credentials
- `logout` - Clear all state
- `setCurrentRoom` - Update current location
- `addToInventory` / `removeFromInventory` - Manage items
- `addCompletedPuzzle` - Track progress
- `updateScore` - Update points

## API Service Layer

**Centralized API Client** ([api.ts](client/src/services/api.ts))

Features:
- Axios-based HTTP client
- Auto-injects JWT token from localStorage
- Request/response interceptors
- Automatic token refresh handling
- Error handling with auto-redirect on 401

Methods:
- `checkUser(username)` - Login/register
- `getCurrentUser()` - Fetch current user data
- Generic: `get()`, `post()`, `put()`, `delete()`

## Backend Architecture

### Models (Mongoose/MongoDB)

**User Model** ([User.ts](server/src/models/User.ts))
```typescript
{
  username: string (unique, 3-20 chars)
  currentRoom: ObjectId (ref: Room)
  score: number
  inventory: ObjectId[] (ref: Item)
  completedPuzzles: string[]
  timestamps: true
}
```

**Room Model** ([Room.ts](server/src/models/Room.ts))
```typescript
{
  title: string
  description: string
  imageAsset: string
  connections: Map<string, string> (direction -> roomId)
  puzzles: ObjectId[] (ref: Puzzle)
  timestamps: true
}
```

**Puzzle Model** ([Puzzle.ts](server/src/models/Puzzle.ts))
```typescript
{
  problemDescription: string
  starterCode: string
  testCases: ITestCase[]
  rewardItem: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timestamps: true
}
```

### Middleware

**Auth Middleware** ([auth.ts](server/src/middleware/auth.ts))
- Extracts JWT from Authorization header
- Verifies token signature
- Attaches user data to request
- Returns 401 for invalid/missing tokens

### Controllers

**Auth Controller** ([authController.ts](server/src/controllers/authController.ts))
- `checkUser` - Login/register endpoint
  - Creates new user if username doesn't exist
  - Returns existing user if found
  - Generates JWT token
- `getCurrentUser` - Protected endpoint
  - Returns current user data
  - Requires authentication

## Security Features

1. **JWT Authentication**
   - Tokens expire in 30 days
   - Secure token generation with configurable secret
   - Token validation on protected routes

2. **Input Validation**
   - Username length constraints (3-20 chars)
   - Mongoose schema validation
   - Request sanitization

3. **CORS Configuration**
   - Configured for cross-origin requests
   - Environment-specific settings

4. **Error Handling**
   - Proper HTTP status codes
   - No sensitive data in error messages
   - Graceful failure handling

## Styling Architecture

### SCSS Module Pattern

**Global Variables** ([_variables.scss](client/src/styles/_variables.scss))
- Dark theme color palette
- Typography scale
- Spacing system
- Border radius values
- Transition timings
- Z-index layers
- Responsive breakpoints

**Global Styles** ([global.scss](client/src/styles/global.scss))
- CSS reset
- Base typography
- Form element styling
- Custom scrollbar
- Dark theme background

**Component Modules**
- `Login.module.scss` - Login page styles
- `Game.module.scss` - Game page styles
- Scoped to component to avoid conflicts
- Uses global variables for consistency

## Development Workflow

### Running the Application

1. **Backend** (Port 5000):
```bash
cd server
npm run dev  # TypeScript with nodemon hot-reload
```

2. **Frontend** (Port 5173):
```bash
cd client
npm run dev  # Vite dev server with HMR
```

### Build Process

**Client**:
- Vite bundles React + TypeScript
- SCSS compiled to CSS
- Tree-shaking and minification
- Output: `dist/` folder

**Server**:
- TypeScript compiled to JavaScript
- Output: `dist/` folder
- Run with: `npm start`

## Future Extension Points

This architecture is designed to easily accommodate:

1. **New Routes**: Add to App.tsx routes array
2. **New Pages**: Create in `/pages` folder
3. **New Components**: Add to `/components` hierarchy
4. **New API Endpoints**: Add route → controller → model
5. **New Redux State**: Extend gameSlice or create new slices
6. **Multiplayer**: WebSocket layer can be added to API service
7. **Real-time Updates**: Redux middleware for socket events
8. **Advanced Puzzles**: New puzzle types in Puzzle model

## Technology Choices Rationale

- **React Router**: Industry standard, mature, great DX
- **Redux Toolkit**: Reduces boilerplate, includes RTK Query
- **SCSS Modules**: Component scoping with powerful Sass features
- **TypeScript**: Type safety across full stack
- **Mongoose**: Schema validation, clean MongoDB abstraction
- **JWT**: Stateless, scalable authentication
- **Vite**: Lightning-fast dev server and builds
