# Pages Directory

This directory contains top-level page components that correspond to routes in the application.

## Current Pages

### Login.tsx
**Route**: `/login`
**Access**: Public
**Purpose**: User authentication (login/registration)

**Features**:
- Username input with validation
- Auto-redirect if already authenticated
- Creates new users automatically
- Error handling and loading states
- Beautiful themed UI

**State Management**:
- Dispatches `setAuthentication` on successful login
- Updates Redux with user data
- Stores JWT in localStorage

---

### Game.tsx
**Route**: `/game`
**Access**: Protected (requires authentication)
**Purpose**: Main game interface

**Features**:
- Welcome message with username
- Player statistics display
- Current room information
- Inventory count
- Puzzles completed count
- Logout functionality

**State Management**:
- Reads from Redux: `username`, `score`, `currentRoom`, `inventory`, `completedPuzzles`
- Dispatches `logout` action

---

## Future Pages

As the game expands, additional pages will be added:

```
pages/
├── Login.tsx           # ✅ Current
├── Game.tsx            # ✅ Current
├── Room.tsx            # Individual room view
├── Puzzle.tsx          # Puzzle solving interface
├── Inventory.tsx       # Inventory management
├── Leaderboard.tsx     # Player rankings
├── Profile.tsx         # User profile settings
└── NotFound.tsx        # 404 error page
```

## Page Guidelines

1. **Route Mapping**: Each page corresponds to a route in App.tsx
2. **Protection**: Use `<ProtectedRoute>` wrapper for authenticated pages
3. **Layout**: Pages are full-page components, not nested
4. **Data Fetching**: Use Redux or API calls in useEffect
5. **SCSS Modules**: Each page has its own `.module.scss` file
6. **Responsive**: Design mobile-first, use breakpoints from variables

## Adding a New Page

1. Create `NewPage.tsx` in this directory
2. Create `NewPage.module.scss` for styles
3. Add route in `App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
4. If protected, wrap in ProtectedRoute:
```tsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```
