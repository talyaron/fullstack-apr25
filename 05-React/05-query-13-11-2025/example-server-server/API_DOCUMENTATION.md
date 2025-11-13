# Book Management API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

This API uses JWT (JSON Web Token) authentication. The token is stored in HTTP-only cookies for security.

After successful login or registration, the server sets an `authToken` cookie that is automatically included in subsequent requests.

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "stack": "..." // Only in development mode
}
```

## Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

---

## Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Validation Rules:**
- Email: Valid email format, required, unique
- Password: Minimum 6 characters, required
- Name: 2-50 characters, required

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or validation errors
- `409` - Email already registered

**Side Effects:**
- Sets `authToken` cookie for automatic authentication

---

### 2. Login User

Authenticate an existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

**Side Effects:**
- Sets `authToken` cookie for automatic authentication

---

### 3. Logout User

End the current user session.

**Endpoint:** `POST /api/auth/logout`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Side Effects:**
- Clears `authToken` cookie

---

### 4. Get Current User

Retrieve the currently authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Not authenticated or user not found

---

## Book Management Endpoints

### 5. Get All Books

Retrieve all books for the authenticated user.

**Endpoint:** `GET /api/books`

**Authentication:** Required

**Query Parameters:**
- None (all filtering is done server-side based on user ID)

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "books": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic American novel",
      "year": 1925,
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f191e810c19729de860eb",
      "title": "1984",
      "author": "George Orwell",
      "description": "A dystopian social science fiction novel",
      "year": 1949,
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:31:00.000Z",
      "updatedAt": "2024-01-15T10:31:00.000Z"
    }
  ]
}
```

**Notes:**
- Books are sorted by creation date (newest first)
- Only returns books belonging to the authenticated user

---

### 6. Get Single Book

Retrieve a specific book by ID.

**Endpoint:** `GET /api/books/:id`

**Authentication:** Required

**URL Parameters:**
- `id` - MongoDB ObjectId of the book

**Success Response (200):**
```json
{
  "success": true,
  "book": {
    "_id": "507f191e810c19729de860ea",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "year": 1925,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid book ID format
- `404` - Book not found or doesn't belong to user

---

### 7. Create Book

Add a new book to the user's collection.

**Endpoint:** `POST /api/books`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "year": 1925
}
```

**Validation Rules:**
- Title: 1-200 characters, required
- Author: 2-100 characters, required
- Description: 0-1000 characters, optional
- Year: Integer, 0 to current year + 10, optional

**Success Response (201):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "book": {
    "_id": "507f191e810c19729de860ea",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "year": 1925,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or validation errors

---

### 8. Update Book

Update an existing book's information.

**Endpoint:** `PUT /api/books/:id`

**Authentication:** Required

**URL Parameters:**
- `id` - MongoDB ObjectId of the book

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "description": "Updated description",
  "year": 2024
}
```

**Validation Rules:**
- Same as Create Book endpoint
- Cannot update `userId` field

**Success Response (200):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "book": {
    "_id": "507f191e810c19729de860ea",
    "title": "Updated Title",
    "author": "Updated Author",
    "description": "Updated description",
    "year": 2024,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid book ID or validation errors
- `404` - Book not found or doesn't belong to user

---

### 9. Delete Book

Remove a book from the user's collection.

**Endpoint:** `DELETE /api/books/:id`

**Authentication:** Required

**URL Parameters:**
- `id` - MongoDB ObjectId of the book

**Success Response (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "book": {
    "_id": "507f191e810c19729de860ea",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "year": 1925,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid book ID
- `404` - Book not found or doesn't belong to user

---

## Utility Endpoints

### 10. Health Check

Check if the server is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 11. API Information

Get information about available endpoints.

**Endpoint:** `GET /`

**Authentication:** Not required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Book Management API Server",
  "version": "1.0.0",
  "endpoints": {
    "auth": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login",
      "logout": "POST /api/auth/logout",
      "me": "GET /api/auth/me"
    },
    "books": {
      "getAll": "GET /api/books",
      "getOne": "GET /api/books/:id",
      "create": "POST /api/books",
      "update": "PUT /api/books/:id",
      "delete": "DELETE /api/books/:id"
    }
  }
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Books
```bash
curl -X GET http://localhost:5000/api/books \
  -b cookies.txt
```

### Create a Book
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My Book",
    "author": "John Doe",
    "description": "A great book",
    "year": 2024
  }'
```

### Update a Book
```bash
curl -X PUT http://localhost:5000/api/books/507f191e810c19729de860ea \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Updated Title"
  }'
```

### Delete a Book
```bash
curl -X DELETE http://localhost:5000/api/books/507f191e810c19729de860ea \
  -b cookies.txt
```

---

## Testing with Postman

### Setting up Postman

1. **Create a new collection** named "Book Management API"

2. **Set collection variables:**
   - `baseUrl`: `http://localhost:5000`
   - `email`: `test@example.com`
   - `password`: `password123`

3. **Configure cookie handling:**
   - Go to Settings → Cookies
   - Allow cookies for `localhost:5000`

### Postman Collection Structure

```
📁 Book Management API
├── 📁 Authentication
│   ├── Register User
│   ├── Login User
│   ├── Logout User
│   └── Get Current User
└── 📁 Books
    ├── Get All Books
    ├── Get Single Book
    ├── Create Book
    ├── Update Book
    └── Delete Book
```

### Example Postman Request

**Create Book Request:**

```
Method: POST
URL: {{baseUrl}}/api/books
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "title": "Test Book",
  "author": "Test Author",
  "description": "Test Description",
  "year": 2024
}
```

### Postman Tests Script

Add this test script to verify responses:

```javascript
pm.test("Status code is 200/201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response has success flag", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
```

---

## Error Handling

### Common Error Messages

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Authentication required" | Missing or invalid token | Login first |
| "User with this email already exists" | Email already registered | Use different email or login |
| "Invalid credentials" | Wrong email or password | Check credentials |
| "Book not found" | Invalid book ID or unauthorized | Verify book ID and ownership |
| "Validation error" | Invalid data format | Check request body format |
| "Token expired" | JWT token expired | Login again |

### Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

### CORS Configuration

The API is configured to accept requests from:
- Default: `http://localhost:5173`
- Configurable via `CLIENT_URL` environment variable

---

## Security Considerations

1. **Password Storage**
   - Passwords are hashed using bcrypt with 10 salt rounds
   - Passwords are never returned in API responses

2. **JWT Tokens**
   - Stored in HTTP-only cookies
   - 7-day expiration (configurable)
   - Secure flag enabled in production

3. **Data Access**
   - Users can only access their own books
   - All book operations verify ownership

4. **Input Validation**
   - All inputs are validated using Mongoose schemas
   - MongoDB injection protection enabled

---

## Environment Variables

Configure the following in your `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your-mongodb-uri

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Frontend URL for CORS
CLIENT_URL=http://localhost:5173
```

---

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Book Collection
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  description: String (optional),
  year: Number (optional),
  userId: ObjectId (indexed, reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Deployment Considerations

### Production Checklist

- [ ] Change `JWT_SECRET` to a strong, unique value
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas or production MongoDB instance
- [ ] Enable HTTPS
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up monitoring and alerts
- [ ] Configure proper CORS origins
- [ ] Add API versioning (e.g., `/api/v1/`)
- [ ] Implement data backup strategy

### Recommended Services

- **Hosting:** Heroku, Railway, Render, AWS EC2
- **Database:** MongoDB Atlas
- **Monitoring:** New Relic, Datadog, Sentry
- **Logging:** LogDNA, Papertrail

---

## Support

For issues or questions, please refer to the README.md file or create an issue in the repository.