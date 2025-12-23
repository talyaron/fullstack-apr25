# Components Directory

This directory contains reusable React components organized by feature/domain.

## Structure

```
components/
├── auth/           # Authentication-related components
│   └── ProtectedRoute.tsx  # Route guard for protected pages
└── [future]        # More component directories as the app grows
```

## Auth Components

### ProtectedRoute
**Purpose**: Wraps protected routes to ensure only authenticated users can access them.

**Usage**:
```tsx
<Route
  path="/game"
  element={
    <ProtectedRoute>
      <Game />
    </ProtectedRoute>
  }
/>
```

**How it works**:
- Checks Redux store for `isAuthenticated` and `token`
- If authenticated: renders children (the protected page)
- If not authenticated: redirects to `/login`

## Future Components

As Station Zero grows, this directory will include:

```
components/
├── auth/
│   ├── ProtectedRoute.tsx
│   └── UserProfile.tsx
├── game/
│   ├── Room.tsx
│   ├── Inventory.tsx
│   └── PuzzleCard.tsx
├── puzzles/
│   ├── CodeEditor.tsx
│   ├── TestResults.tsx
│   └── PuzzleDescription.tsx
├── ui/
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Card.tsx
└── layout/
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Footer.tsx
```

## Component Guidelines

1. **Single Responsibility**: Each component should do one thing well
2. **Reusability**: Design components to be reused across the app
3. **Type Safety**: Always use TypeScript interfaces for props
4. **SCSS Modules**: Use `.module.scss` for component styles
5. **Documentation**: Add JSDoc comments for complex components
