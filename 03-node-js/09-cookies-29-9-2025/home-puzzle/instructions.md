# Cookie-Based Authentication Exercise

## Video Explanation
[![Watch the video](https://go.screenpal.com/watch/cTQUFlnDyJm)](https://go.screenpal.com/watch/cTQUFlnDyJm)

## Overview
In this exercise, you will modify the authentication system to use cookies instead of explicitly passing user IDs.

## What are Cookies?

**Cookies** are small pieces of data that the server sends to the browser, and the browser automatically sends them back with every subsequent request to that server.

### How Cookies Work:

1. **User logs in:** When a user successfully logs in, the server sends a cookie to the browser containing the user ID

2. **Browser stores cookie:** The browser saves this cookie

3. **Automatic transmission:** Every subsequent request from the browser automatically includes this cookie

4. **Server reads cookie:** The server reads the userId from the cookie and knows which user is making the request

### Example:
```typescript
// Server sets cookie when user logs in
res.cookie('userId', user._id);

// Later, on any request, server can read this cookie
const userId = req.cookies.userId;
```

The beauty is that the client doesn't need to do anything special - the browser automatically sends the cookie with every request!

**Note:** In this exercise, we're using simple cookies for learning purposes. In production applications, you would use more secure methods like JWT tokens or sessions.

## Current Implementation
The application currently passes the user ID explicitly after login:
```typescript
this.loadTasks(user._id);
```

## Your Task

### Level 1 (Max 90 points)

**Goal:** Implement cookie-based authentication for loading user tasks.

**What needs to change:**

1. **Client Side (`public/app.ts`):**
   - Comment out the line: `this.loadTasks(user._id);`
   - Replace it with: `this.loadUserTasks();`
   - Implement the new `loadUserTasks()` method that does NOT require a userId parameter

2. **Server Side:**
   - Modify the login endpoint to set a cookie with the user ID when the user logs in
   - Modify the tasks endpoint to read the userId from the cookie instead of requiring it in the request
   - Use the cookie data to retrieve the authenticated user's tasks

**Key Concepts:**
- Cookies are automatically sent with every HTTP request
- The server can identify the user from the cookie without the client explicitly sending the user ID
- You need to use `cookie-parser` middleware to read cookies in Express

**Hints:**
- Use `res.cookie('userId', user._id)` to set a cookie
- Use `req.cookies.userId` to read the cookie
- Make sure `cookie-parser` middleware is installed and configured in your Express app

### Level 2 (Additional 10 points) - Max Total: 100 points

**Goal:** Add complete logout functionality to the application.

**What needs to be added:**

1. **Server Side:**
   - Create a POST `/api/logout` endpoint
   - Clear the userId cookie using `res.clearCookie('userId')`
   - Return a success message

2. **Client Side:**
   - Add a logout button to the UI (in the header or user info area)
   - Create a `logout()` method that:
     - Calls the logout endpoint
     - Clears local state (`selectedUser`, `tasks`)
     - Redirects to `login.html`
   - Attach the logout button click event to this method

**Key Concepts:**
- Complete authentication flow includes both login AND logout
- Clearing cookies properly logs the user out
- UI should reflect authentication state

## Scoring Evaluation

### Level 1: Cookie-Based Task Loading (Max 90 points)

### Understanding (10 points)
You should understand that:
- The example code already has cookie-parser installed and configured
- The login endpoint already sets the cookie
- You need to modify how tasks are loaded to use cookies

### Server Side (40 points)

- **Create new endpoint for user tasks (25 points):**
  - Create a new route (e.g., `/api/tasks/my-tasks`) that reads userId from `req.cookies.userId`
  - Returns only the tasks for the authenticated user
  - No userId parameter needed in the request

- **Endpoint works correctly (15 points):**
  - Correctly fetches tasks from database using the userId from cookie
  - Populates user information in tasks
  - Handles errors appropriately

### Client Side (30 points)

- **Comment out old code (5 points):**
  - Line 74: `this.loadTasks(user._id);` is properly commented out

- **Implement new method (15 points):**
  - Create `loadUserTasks()` method that makes a fetch request to your new endpoint
  - Method does NOT pass userId as parameter
  - Method updates `this.tasks` with the response

- **Call the new method (10 points):**
  - Replace commented line with: `this.loadUserTasks();`
  - Method is called at the right time (after loading user from cookie)

### Functionality Testing (10 points)
- **Application works end-to-end:**
  - User can log in and see their tasks automatically
  - Tasks are loaded using cookies only (no userId passed from client)
  - Different users see only their own tasks

### Bonus Points (Optional)
- Clean, readable code with good variable names and structure (+5 points)
- Proper error handling (try-catch blocks, meaningful error messages) (+5 points)

### Level 2: Logout Functionality (Additional 10 points)

**To achieve full 100 points, complete Level 1 + Level 2**

#### Server Side (5 points)
- **Logout endpoint created (3 points):**
  - POST `/api/logout` route exists
  - Clears the userId cookie correctly using `res.clearCookie('userId')`

- **Endpoint works correctly (2 points):**
  - Returns appropriate success response
  - Cookie is actually cleared (verify in browser dev tools)

#### Client Side (5 points)
- **Logout button in UI (1 point):**
  - Button is visible and properly placed

- **Logout method implementation (3 points):**
  - Method calls the logout endpoint
  - Clears `selectedUser` and `tasks` from state
  - Redirects to `login.html` using `window.location.href = 'login.html'`

- **Event handler connected (1 point):**
  - Button click properly triggers logout

**Note:** Bonus points can push your score above 100!

## Submission

### For Level 1 (90 points):
Test your implementation by:
1. Logging in with a user
2. Verifying that tasks load without explicitly passing the user ID
3. Confirming that different users see only their own tasks

### For Level 2 (100 points):
Additionally test:
4. Click logout button and verify:
   - Cookie is cleared (check browser DevTools > Application > Cookies)
   - User is redirected to `login.html`
5. Try to log in again - should work normally

**Important:** Make sure to test thoroughly before submitting. The application should work exactly like before, but now using cookies instead of explicitly passing the user ID!

## Summary of Points:
- **Level 1 only:** Max 90 points (+ up to 10 bonus) = 100 total possible
- **Level 1 + Level 2:** Max 100 points (+ up to 10 bonus) = 110 total possible

Good luck!