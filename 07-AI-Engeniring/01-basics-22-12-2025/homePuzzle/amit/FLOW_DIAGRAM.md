# Station Zero - Application Flow Diagram

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP INITIALIZATION                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Check LocalStorage│
                    │  for Token?       │
                    └──────────────────┘
                         │          │
                    Token│          │No Token
                    Found│          │
                         │          │
          ┌──────────────┘          └──────────────┐
          ▼                                        ▼
    ┌──────────────┐                        ┌──────────────┐
    │ Validate Token│                        │ Redirect to  │
    │ with Backend │                        │  /login      │
    │ GET /api/auth/me│                      └──────────────┘
    └──────────────┘
          │     │
     Valid│     │Invalid
          │     │
          │     └─────────┐
          │               │
          ▼               ▼
    ┌──────────┐    ┌──────────────┐
    │ Load User│    │ Clear Token  │
    │ into Redux│   │ Redirect to  │
    │ Redirect  │    │  /login      │
    │ to /game  │    └──────────────┘
    └──────────┘
```

## Login Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN PAGE (/login)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  User Enters     │
                    │  Username        │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Client-side     │
                    │  Validation      │
                    │  (3-20 chars)    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  POST /api/auth/ │
                    │  check-user      │
                    │  {username}      │
                    └──────────────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
            Success│                     │Error
                   │                     │
                   ▼                     ▼
        ┌─────────────────┐    ┌─────────────────┐
        │ Receive:        │    │ Display Error   │
        │ - JWT Token     │    │ Message         │
        │ - User Data     │    │ Stay on /login  │
        └─────────────────┘    └─────────────────┘
                   │
                   ▼
        ┌─────────────────┐
        │ Save Token to:  │
        │ - localStorage  │
        │ - Redux Store   │
        └─────────────────┘
                   │
                   ▼
        ┌─────────────────┐
        │ Populate Redux  │
        │ with User Data  │
        └─────────────────┘
                   │
                   ▼
        ┌─────────────────┐
        │ Navigate to     │
        │ /game           │
        └─────────────────┘
```

## Protected Route Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   USER NAVIGATES TO /game                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  ProtectedRoute  │
                    │  Component       │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Check Redux:    │
                    │  isAuthenticated?│
                    │  token exists?   │
                    └──────────────────┘
                         │          │
                   YES   │          │ NO
                         │          │
          ┌──────────────┘          └──────────────┐
          ▼                                        ▼
    ┌──────────────┐                        ┌──────────────┐
    │ Render       │                        │ Redirect to  │
    │ <Game />     │                        │  /login      │
    │ Component    │                        │  (replace)   │
    └──────────────┘                        └──────────────┘
```

## Game Page Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       GAME PAGE (/game)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Component Mounts│
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Read from Redux:│
                    │  - username      │
                    │  - score         │
                    │  - currentRoom   │
                    │  - inventory     │
                    │  - completedPuz  │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Display:        │
                    │  - Welcome msg   │
                    │  - Stats grid    │
                    │  - Current status│
                    └──────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
        User clicks │                   │ User plays
        Logout      │                   │ (future)
                    │                   │
                    ▼                   ▼
          ┌─────────────────┐  ┌─────────────────┐
          │ dispatch(logout)│  │ Navigate rooms  │
          │ Clear Redux     │  │ Solve puzzles   │
          │ Clear localStorage│ │ Collect items   │
          └─────────────────┘  └─────────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Navigate to     │
          │ /login          │
          └─────────────────┘
```

## API Request Flow (with Interceptors)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT MAKES API REQUEST                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Request         │
                    │  Interceptor     │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Get Token from  │
                    │  localStorage    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Add to Headers: │
                    │  Authorization:  │
                    │  Bearer <token>  │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Send Request to │
                    │  Backend         │
                    └──────────────────┘
                              │
                   ┌──────────┴──────────┐
                   │                     │
            Success│                     │401 Error
              (2xx)│                     │
                   │                     │
                   ▼                     ▼
        ┌─────────────────┐    ┌─────────────────┐
        │ Response        │    │ Response        │
        │ Interceptor     │    │ Interceptor     │
        │ Return Data     │    │ Detects 401     │
        └─────────────────┘    └─────────────────┘
                   │                     │
                   ▼                     ▼
        ┌─────────────────┐    ┌─────────────────┐
        │ Component       │    │ Clear localStorage│
        │ Receives Data   │    │ Redirect to     │
        └─────────────────┘    │  /login         │
                               └─────────────────┘
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         COMPONENT LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Login   │  │   Game   │  │Protected │  │   App    │        │
│  │  Page    │  │   Page   │  │  Route   │  │  (Router)│        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│       │             │              │              │              │
│       └─────────────┴──────────────┴──────────────┘              │
│                           │                                       │
└───────────────────────────┼───────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                      REDUX STORE LAYER                            │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Game Slice (gameSlice.ts)                              │     │
│  │  ┌─────────────────────────────────────────────────┐   │     │
│  │  │  State: username, score, currentRoom, etc.      │   │     │
│  │  └─────────────────────────────────────────────────┘   │     │
│  │  ┌─────────────────────────────────────────────────┐   │     │
│  │  │  Actions: setPlayer, logout, setAuth, etc.      │   │     │
│  │  └─────────────────────────────────────────────────┘   │     │
│  └────────────────────────────────────────────────────────┘     │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  API Service (api.ts)                                   │     │
│  │  - Axios Instance                                       │     │
│  │  - Request/Response Interceptors                        │     │
│  │  - Token Management                                     │     │
│  └────────────────────────────────────────────────────────┘     │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                     BACKEND API LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Routes  │→ │Middleware│→ │Controller│→ │  Models  │        │
│  │          │  │  (Auth)  │  │          │  │          │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                   │               │
└───────────────────────────────────────────────────┼───────────────┘
                                                    │
                                                    ▼
                                          ┌──────────────┐
                                          │   MongoDB    │
                                          │   Database   │
                                          └──────────────┘
```

## Summary

This architecture provides:

✅ **Clear Separation**: Components → Redux → Services → API → Database
✅ **Security**: Token-based auth, protected routes, middleware validation
✅ **User Experience**: Auto-login, session persistence, smooth navigation
✅ **Scalability**: Easy to add new pages, features, and endpoints
✅ **Maintainability**: Well-organized, typed, and documented code
