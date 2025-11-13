# Book Management Server

A Node.js/Express server for managing books with JWT authentication and MongoDB integration.

## Features

- User authentication (register, login, logout) with JWT tokens stored in HTTP-only cookies
- Secure password hashing using bcrypt
- User-specific book management (CRUD operations)
- MongoDB database integration
- TypeScript support
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd /Users/talyaron/Documents/fullstack-apr25/05-React/05-query-13-11-2025/example-server-server
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Update the `.env` file in the root directory with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your-mongodb-uri-here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL for CORS
CLIENT_URL=http://localhost:5173
```

**Important:** Replace `MONGODB_URI` with your actual MongoDB connection string when you have it.

## Running the Server

### Development Mode
```bash
npm run dev
```
This will start the server with hot-reload using nodemon and tsx.

### Production Mode
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

## API Endpoints

### Authentication

#### Register a new user
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Logout
```
POST /api/auth/logout
```

#### Get current user
```
GET /api/auth/me
```
Requires authentication

### Books (All require authentication)

#### Get all books for the logged-in user
```
GET /api/books
```

#### Get a specific book
```
GET /api/books/:id
```

#### Create a new book
```
POST /api/books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description (optional)",
  "year": 2024 (optional)
}
```

#### Update a book
```
PUT /api/books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "description": "Updated description",
  "year": 2024
}
```

#### Delete a book
```
DELETE /api/books/:id
```

### Health Check
```
GET /health
```

## Project Structure

```
src/
├── config/
│   └── database.ts         # MongoDB connection configuration
├── models/
│   ├── User.ts            # User schema with password hashing
│   └── Book.ts            # Book schema with user reference
├── controllers/
│   ├── authController.ts  # Authentication logic
│   └── bookController.ts  # Book CRUD operations
├── routes/
│   ├── authRoutes.ts      # Authentication endpoints
│   └── bookRoutes.ts      # Book management endpoints
├── middleware/
│   └── authMiddleware.ts  # JWT verification middleware
├── utils/
│   └── jwt.ts             # JWT token utilities
└── server.ts              # Main application entry point
```

## Security Features

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens are stored in HTTP-only cookies to prevent XSS attacks
- Cookies use `SameSite: strict` to prevent CSRF attacks
- User passwords are never returned in API responses
- Input validation on all routes
- MongoDB injection protection through Mongoose
- CORS configured for specific frontend origin

## Testing with cURL

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create a book (after login)
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"My Book","author":"John Doe","description":"A great book","year":2024}'
```

### Get all books (after login)
```bash
curl -X GET http://localhost:5000/api/books \
  -b cookies.txt
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your MongoDB Atlas cluster is accessible
- Check that the `MONGODB_URI` in `.env` is correct
- For local MongoDB: `mongodb://localhost:27017/bookstore`
- For MongoDB Atlas: Use the connection string from your cluster

### Port Already in Use
- Change the `PORT` value in `.env` to a different port
- Or stop the process using the current port

### Authentication Issues
- Ensure cookies are enabled in your client
- Check that `JWT_SECRET` is set in `.env`
- Verify that the frontend URL in CORS configuration matches your client

## License

ISC

## Author

Your Name

## Contributing

Feel free to submit issues and pull requests.