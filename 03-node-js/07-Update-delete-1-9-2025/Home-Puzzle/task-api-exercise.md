# Task Management API - Progressive Exercise

## Overview
Build a Task Management REST API through two progressive levels, each introducing new concepts and complexity. This exercise is designed for students who have learned basic CRUD operations with vanilla TypeScript and Node.js/Express.

---

## Level 1: Simple CRUD (Beginner)
**Objective:** Build a Basic Task API with fundamental CRUD operations

### Requirements

#### Data Model
Create a `Task` interface with the following fields:
- `id` (string) - Unique identifier
- `title` (string) - Task title
- `description` (string, optional) - Task description
- `completed` (boolean) - Completion status
- `createdAt` (Date) - Creation timestamp

#### REST Endpoints
Implement the following endpoints:
- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Retrieve a single task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

#### Technical Requirements
- Use in-memory array for storage (no database required)
- Implement basic validation (title is required and non-empty)
- Return appropriate HTTP status codes:
  - 200 OK for successful GET/PUT/DELETE
  - 201 Created for successful POST
  - 400 Bad Request for validation errors
  - 404 Not Found for invalid IDs

### Example Starter Code

```typescript
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const app = express();
app.use(express.json());

let tasks: Task[] = [];

// Your implementation here

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Success Criteria
- [ ] All CRUD operations function correctly
- [ ] Proper HTTP status codes are returned
- [ ] Basic error handling for invalid IDs
- [ ] Title validation is implemented


---

## Level 2: Intermediate Enhancement
**Objective:** Add filtering, pagination, sorting, and basic authentication

### New Requirements

#### Enhanced Data Model
Add the following fields to the Task interface:
- `priority` ('low' | 'medium' | 'high') - Task priority level
- `dueDate` (Date, optional) - Task deadline

#### Query Parameters
Implement query parameter support for GET /tasks:
- `?completed=true/false` - Filter by completion status
- `?search=keyword` - Search in title and description
- `?page=1&limit=10` - Pagination (default: page=1, limit=20)
- `?sortBy=createdAt&order=desc` - Sorting (sortBy: createdAt/dueDate/priority, order: asc/desc)
- `?priority=high` - Filter by priority

#### Authentication
Implement API key authentication:
- Check for `x-api-key` header in all requests
- Use a hardcoded API key for simplicity
- Return 401 Unauthorized for invalid/missing keys

#### Enhanced Validation
- Validate date format for dueDate (ISO 8601)
- Validate priority values (only 'low', 'medium', 'high')
- Return detailed error messages with field names

### Implementation Example

```typescript
interface EnhancedTask extends Task {
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

// Authentication middleware
const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.API_KEY || 'your-secret-key-123') {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    });
  }
  
  next();
};

// Apply to all routes
app.use(authenticateApiKey);

// Pagination helper
const paginate = (array: any[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: array.length,
      totalPages: Math.ceil(array.length / limit)
    }
  };
};
```

### Success Criteria
- [ ] All filtering options work correctly
- [ ] Pagination returns correct data and metadata
- [ ] Sorting works for all specified fields
- [ ] API key authentication blocks unauthorized requests
- [ ] Validation provides clear error messages
- [ ] Combined query parameters work together



