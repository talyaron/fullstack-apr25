# Troubleshooting Guide

## Fixed Issues

### 1. ✅ Vite Cache Issue - PayloadAction Export Error

**Error**: `The requested module does not provide an export named 'PayloadAction'`

**Fix Applied**: Cleared Vite cache
```bash
cd client
rm -rf node_modules/.vite
```

**How to fix if it happens again**:
- Stop the dev server (Ctrl+C)
- Delete `client/node_modules/.vite` folder
- Restart: `npm run dev`

### 2. ✅ Mongoose Duplicate Index Warning

**Error**: `Duplicate schema index on {"username":1} found`

**Fix Applied**: Removed `UserSchema.index({ username: 1 })` line since `unique: true` already creates the index.

**File**: `server/src/models/User.ts` - Line 46 removed

---

## Current Setup Steps

### To Run the Application:

1. **Start MongoDB** (if not running):
   ```bash
   mongod
   # or on Windows service:
   net start MongoDB
   ```

2. **Start Backend** (Terminal 1):
   ```bash
   cd server
   npm run dev
   ```
   Should show: `Server running in development mode on port 5000`

3. **Start Frontend** (Terminal 2):
   ```bash
   cd client
   npm run dev
   ```
   Should show: `Local: http://localhost:5173/`

4. **Open Browser**:
   ```
   http://localhost:5173
   ```

### What You Should See:

1. **Login Page** (`/login`):
   - Dark background with terminal green theme
   - "STATION ZERO" title
   - "Enter your callsign" input field
   - "Enter Station" button

2. **After Login** (`/game`):
   - **Header**: Logo, username, score, settings icon
   - **Room View**: "Initialization Chamber" with typewriter text
   - **MAP Button**: Top right corner
   - **Inventory Bar**: Bottom with 6 empty slots

---

## Common Issues

### White Screen / Blank Page

**Causes**:
1. Vite cache issue (most common)
2. Import errors
3. Server not running

**Solutions**:
```bash
# 1. Clear Vite cache
cd client
rm -rf node_modules/.vite

# 2. Check browser console (F12) for errors

# 3. Ensure server is running
cd server
npm run dev

# 4. Hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Server Not Starting

**Check**:
1. MongoDB is running
2. Port 5000 is available
3. Dependencies installed

```bash
cd server
npm install
npm run dev
```

### Import Errors

**If you see TypeScript/import errors**:
```bash
# Client
cd client
npm install
rm -rf node_modules/.vite

# Server
cd server
npm install
rm -rf dist
npm run build
```

### MongoDB Connection Failed

**Check**:
1. MongoDB service is running
2. Connection string in `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/station-zero
   ```

**Start MongoDB**:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community

# Manual
mongod
```

---

## Development Workflow

### Making Changes

**Frontend**:
- Changes auto-reload with Hot Module Replacement (HMR)
- If styles don't update, hard refresh: `Ctrl+Shift+R`

**Backend**:
- Nodemon auto-restarts on file changes
- Check terminal for any errors

### Clearing Everything (Nuclear Option)

If nothing works:

```bash
# Client
cd client
rm -rf node_modules
rm -rf node_modules/.vite
rm package-lock.json
npm install
npm run dev

# Server
cd server
rm -rf node_modules
rm -rf dist
rm package-lock.json
npm install
npm run dev
```

---

## Browser Console Errors

### Common Errors & Fixes:

1. **Module not found**:
   - Check file paths are correct
   - Ensure file exists
   - Clear Vite cache

2. **Redux errors**:
   - Check gameSlice exports
   - Ensure store is properly configured
   - Check Provider wraps App in main.tsx

3. **SCSS errors**:
   - Ensure `.module.scss` files exist
   - Check import paths
   - Verify SCSS syntax

4. **API errors (401, 404, 500)**:
   - Check server is running
   - Verify API endpoint exists
   - Check network tab in DevTools

---

## Checklist Before Asking for Help

- [ ] MongoDB is running
- [ ] Server is running on port 5000
- [ ] Client is running on port 5173
- [ ] Browser console shows no errors (F12)
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Cleared Vite cache
- [ ] All dependencies installed

---

## Success Indicators

### Server Running Successfully:
```
MongoDB connected successfully
Server running in development mode on port 5000
```

### Client Running Successfully:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Browser Working:
- No red errors in console (F12)
- Login page shows with green theme
- Can enter username and login
- After login, shows game interface

---

**If you still see a white screen after these fixes, check the browser console (F12) and share any errors!**
