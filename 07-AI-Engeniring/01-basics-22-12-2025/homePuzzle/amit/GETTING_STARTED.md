# Getting Started with Station Zero

## Quick Start Guide

### Prerequisites Checklist
- ✅ Node.js v18+ installed
- ✅ MongoDB installed and running
- ✅ npm or yarn package manager
- ✅ Git (for version control)

### Installation (5 minutes)

**1. Install Server Dependencies**
```bash
cd server
npm install
```

**2. Install Client Dependencies**
```bash
cd ../client
npm install
```

**3. Configure Environment Variables**

Server `.env`:
```bash
cd ../server
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

Client `.env`:
```bash
cd ../client
cp .env.example .env
# Default VITE_API_URL=http://localhost:5000/api works for local dev
```

**4. Start MongoDB**
```bash
# On Windows (if installed as service)
net start MongoDB

# On macOS/Linux
mongod

# Or use MongoDB Compass/Atlas
```

**5. Start the Backend Server**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**6. Start the Frontend Client** (in a new terminal)
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

**7. Open Your Browser**
```
http://localhost:5173
```

## First Time User Flow

1. **Landing**: Opens to `/login` page
2. **Register**: Enter a username (3-20 characters)
3. **Auto-login**: Automatically redirected to `/game`
4. **Game Screen**: See your stats and welcome message
5. **Logout**: Click logout to return to login screen

## Returning User Flow

1. **Auto-login**: If you have a valid token, automatically redirected to `/game`
2. **Session Persistence**: Your session lasts 30 days
3. **Resume Progress**: All your stats, inventory, and progress are saved

## Project Structure Quick Reference

```
amit/
├── client/
│   ├── src/
│   │   ├── components/auth/    # ProtectedRoute component
│   │   ├── pages/              # Login.tsx, Game.tsx
│   │   ├── store/              # Redux (store.ts, gameSlice.ts, hooks.ts)
│   │   ├── services/           # API service (api.ts)
│   │   ├── styles/             # SCSS (_variables.scss, global.scss)
│   │   ├── App.tsx             # Router setup
│   │   └── main.tsx            # Entry point
│   └── package.json
│
└── server/
    ├── src/
    │   ├── config/             # database.ts
    │   ├── controllers/        # authController.ts
    │   ├── middleware/         # auth.ts
    │   ├── models/             # User.ts, Room.ts, Puzzle.ts
    │   ├── routes/             # authRoutes.ts
    │   ├── utils/              # jwt.ts
    │   └── server.ts           # Express app
    └── package.json
```

## Available Scripts

### Server Scripts
```bash
npm run dev      # Development with hot-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build
npm run lint     # Run ESLint
```

### Client Scripts
```bash
npm run dev      # Development with HMR
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Testing the Setup

### Test Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"Station Zero API is running","timestamp":"..."}
```

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'
# Should return user object with JWT token
```

### Test Protected Route
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
# Should return current user data
```

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution**:
- Ensure MongoDB is running: `mongod` or check service status
- Verify MONGODB_URI in server/.env
- Check MongoDB logs for errors

### Issue: Port Already in Use
**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: CORS Errors
**Solution**:
- Ensure server is running on port 5000
- Check VITE_API_URL in client/.env
- Verify cors middleware in server.ts

### Issue: JWT Token Invalid
**Solution**:
- Clear localStorage: `localStorage.clear()` in browser console
- Check JWT_SECRET matches between sessions
- Token might be expired (30 days default)

### Issue: Dependencies Won't Install
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Development Tips

### Hot Module Replacement (HMR)
- Client changes auto-reload instantly
- Server restarts automatically with nodemon
- No need to manually refresh

### Redux DevTools
Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) to inspect state:
- View current game state
- Track actions
- Time-travel debugging

### MongoDB GUI
Use [MongoDB Compass](https://www.mongodb.com/products/compass) to:
- View/edit collections
- Inspect user data
- Test queries

### API Testing
Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to:
- Test API endpoints
- Inspect responses
- Debug authentication

## Next Steps After Setup

1. ✅ Verify both client and server are running
2. ✅ Create a test user and login
3. ✅ Explore the Game page
4. ✅ Check Redux state in DevTools
5. ✅ Review the codebase structure
6. ✅ Read ARCHITECTURE.md for deeper understanding
7. ⏭️ Ready for Step 2 implementation!

## Need Help?

- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Full Documentation**: See [README.md](README.md)
- **Code Issues**: Check error messages in browser console and terminal
- **Database Issues**: Check MongoDB logs

---

**You're all set!** The foundation for Station Zero is ready. Time to build the actual game mechanics! 🚀
