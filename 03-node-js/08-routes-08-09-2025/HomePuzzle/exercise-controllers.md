# Controllers Exercise: Car Management API

## Overview
In this exercise, you'll build a Car Management API using Express.js with the MVC (Model-View-Controller) pattern. You'll create separate files for models, routes, and controllers to maintain clean, organized code.

## Project Structure
```
src/
├── index.ts
├── model/
│   └── car.model.ts
├── routes/
│   └── cars.route.ts
└── controllers/
    └── cars.controllers.ts
```

---

## Level 1: Basic Implementation (Replace Students with Cars)
**Goal:** Create a simple Car Management API by adapting the student example.

### Requirements:
1. **Create Car Model** (`src/model/car.model.ts`):
   - Interface with properties: `id`, `brand`, `model`, `year`, `price`
   - Initialize array with 3 sample cars

2. **Create Car Controllers** (`src/controllers/cars.controllers.ts`):
   - `getAllCars`: Return all cars
   - `addCar`: Add a new car with auto-generated ID
   - `updateCarPrice`: Update car price by ID

3. **Create Car Routes** (`src/routes/cars.route.ts`):
   - GET `/api/cars/all-cars`
   - POST `/api/cars/add-car`
   - PATCH `/api/cars/update-price`

4. **Update main file** (`src/index.ts`):
   - Import and use car routes

### Expected Request/Response Examples:
```typescript
// GET /api/cars/all-cars
// Response: { cars: [...] }

// POST /api/cars/add-car
// Body: { brand: "Toyota", model: "Camry", year: 2024, price: 25000 }
// Response: "Car Toyota Camry added successfully"

// PATCH /api/cars/update-price
// Body: { id: 1, price: 23000 }
// Response: "Car 1 price updated successfully"
```

---

## Level 2: Enhanced Features with Validation
**Goal:** Add more sophisticated features requiring thoughtful implementation.

### Additional Requirements:
1. **Expand Car Model**:
   - Add `color`, `mileage`, and `isAvailable` properties
   - Add enum for car status: `AVAILABLE`, `SOLD`, `RESERVED`

2. **Add New Controllers**:
   - `getCarById`: Get specific car by ID
   - `deleteCar`: Soft delete (mark as unavailable)
   - `getAvailableCars`: Filter only available cars
   - `searchCars`: Search by brand OR model (query parameters)

3. **Implement Validation**:
   - Validate year is between 1900 and current year + 1
   - Validate price is positive
   - Validate mileage is non-negative
   - Return appropriate error messages for invalid data

4. **Add Business Logic**:
   - Calculate car depreciation based on age and mileage
   - Implement a discount system (e.g., 10% off for cars older than 5 years)
   - Track total inventory value

### Expected Features:
```typescript
// GET /api/cars/search?brand=Toyota
// GET /api/cars/available
// GET /api/cars/:id
// DELETE /api/cars/:id
// GET /api/cars/inventory-value
```

---

## Level 3: Advanced Features with New Concepts
**Goal:** Implement one or two advanced features using concepts not covered in class.

### Choose 2 Features to Implement:

1. **Simple Middleware for Request Logging**:
   - Create custom middleware to log all requests
   - Log: timestamp, method, URL
   - Example: `[2025-01-09 10:30:45] GET /api/cars/all-cars`

2. **Basic Data Persistence with JSON File**:
   - Save cars array to `data/cars.json` file
   - Load cars from file when server starts
   - Update file when adding/updating/deleting cars
   - Use `fs.writeFileSync` and `fs.readFileSync`

3. **Simple Statistics Endpoint**:
   - Calculate average price of all cars
   - Find most expensive and cheapest car
   - Count cars by brand
   - Return as single statistics object

### Example Implementation for Chosen Features:

**If you choose Middleware:**
```typescript
// In index.ts
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});
```

**If you choose File Persistence:**
```typescript
// In car.model.ts
import fs from 'fs';

export function saveCarsToFile() {
    fs.writeFileSync('./data/cars.json', JSON.stringify(cars, null, 2));
}

export function loadCarsFromFile() {
    if (fs.existsSync('./data/cars.json')) {
        const data = fs.readFileSync('./data/cars.json', 'utf-8');
        return JSON.parse(data);
    }
    return [];
}
```

**If you choose Statistics:**
```typescript
// GET /api/cars/statistics
// Response: {
//   totalCars: 10,
//   averagePrice: 25000,
//   mostExpensive: { brand: "BMW", model: "M3", price: 80000 },
//   cheapest: { brand: "Honda", model: "Civic", price: 15000 },
//   carsByBrand: { "Toyota": 3, "Honda": 2, "BMW": 1 }
// }
```

---

## Testing Your API

Use tools like Postman, Thunder Client, or curl to test your endpoints:

```bash
# Get all cars
curl http://localhost:3000/api/cars/all-cars

# Add a new car
curl -X POST http://localhost:3000/api/cars/add-car \
  -H "Content-Type: application/json" \
  -d '{"brand":"Honda","model":"Civic","year":2023,"price":22000}'

# Update car price
curl -X PATCH http://localhost:3000/api/cars/update-price \
  -H "Content-Type: application/json" \
  -d '{"id":1,"price":21000}'
```

---

## Evaluation Criteria

### Level 1 (Basic):
- ✅ Code runs without errors
- ✅ All three endpoints work correctly
- ✅ Proper file structure maintained

### Level 2 (Intermediate):
- ✅ All Level 1 criteria met
- ✅ Validation works correctly
- ✅ Error handling implemented
- ✅ Search and filter functionality works

### Level 3 (Advanced):
- ✅ All Level 2 criteria met
- ✅ At least 2 new features implemented correctly
- ✅ Code is well-organized and documented
- ✅ Proper error handling throughout

---

## Tips for Success

1. **Start Simple**: Complete Level 1 fully before moving to Level 2
2. **Test Frequently**: Test each endpoint as you build it
3. **Handle Errors**: Always include try-catch blocks in controllers
4. **Use TypeScript**: Leverage TypeScript's type safety
5. **Keep It Clean**: Separate concerns - models, routes, and controllers
6. **Document Your Code**: Add comments for complex logic
7. **Version Control**: Commit your changes regularly

Good luck! 🚗💻