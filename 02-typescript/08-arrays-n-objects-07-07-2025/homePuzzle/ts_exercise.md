# TypeScript Practice: Functions, Loops & Objects (Easy → Hard)

Complete each exercise and test your functions! Progress through each level before moving to the next.

---

## 🟢 LEVEL 1: Super Easy Functions

### Exercise 1.1: Simple array function
Create a function that returns the length of an array

```typescript
function getArrayLength(arr: any[]): number {
    // Return the length of the array
    return 0;
}

// Test it:
console.log("Length of [1,2,3]:", getArrayLength([1, 2, 3])); // Should be 3
```

### Exercise 1.2: Simple object function
Create a function that returns a person's name from an object

```typescript
function getPersonName(person: {name: string, age: number}): string {
    // Return the person's name
    return "";
}

// Test it:
let testPerson = {name: "Alice", age: 25};
console.log("Person's name:", getPersonName(testPerson)); // Should be "Alice"
```

### Exercise 1.3: Simple loop function
Create a function that prints numbers from 1 to n

```typescript
function printNumbers(n: number): void {
    // Use a for loop to print 1, 2, 3, ... up to n
}

// Test it:
console.log("Numbers 1 to 5:");
printNumbers(5); // Should print 1, 2, 3, 4, 5
```

---

## 🟡 LEVEL 2: Easy Functions

### Exercise 2.1: Sum array elements
Create a function that adds all numbers in an array

```typescript
function sumArray(numbers: number[]): number {
    // Use a loop to add all numbers together
    return 0;
}

// Test it:
console.log("Sum of [1,2,3,4]:", sumArray([1, 2, 3, 4])); // Should be 10
```

### Exercise 2.2: Count objects in array
Create a function that counts how many people are in an array

```typescript
function countPeople(people: {name: string, age: number}[]): number {
    // Return the number of people in the array
    return 0;
}

// Test it:
let people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 35}
];
console.log("Number of people:", countPeople(people)); // Should be 3
```

### Exercise 2.3: Find largest number
Create a function that finds the biggest number in an array

```typescript
function findLargest(numbers: number[]): number {
    // Use a loop to find the largest number
    return 0;
}

// Test it:
console.log("Largest in [5,2,9,1]:", findLargest([5, 2, 9, 1])); // Should be 9
```

---

## 🟠 LEVEL 3: Medium Functions

### Exercise 3.1: Filter array by condition
Create a function that returns only even numbers from an array

```typescript
function getEvenNumbers(numbers: number[]): number[] {
    // Use a loop to collect only even numbers
    let evens: number[] = [];
    // Your code here
    return evens;
}

// Test it:
console.log("Even numbers from [1,2,3,4,5,6]:", getEvenNumbers([1, 2, 3, 4, 5, 6])); 
// Should be [2, 4, 6]
```

### Exercise 3.2: Find person by name
Create a function that finds a person by their name

```typescript
function findPersonByName(
    people: {name: string, age: number}[], 
    searchName: string
): {name: string, age: number} | null {
    // Use a loop to search for the person
    // Return null if not found
    return null;
}

// Test it:
console.log("Find Bob:", findPersonByName(people, "Bob")); // Should return Bob's object
```

### Exercise 3.3: Create array of squares
Create a function that returns an array of squared numbers

```typescript
function getSquares(numbers: number[]): number[] {
    // Return a new array where each number is squared
    let squares: number[] = [];
    // Your code here
    return squares;
}

// Test it:
console.log("Squares of [1,2,3,4]:", getSquares([1, 2, 3, 4])); // Should be [1, 4, 9, 16]
```

---

## 🔴 LEVEL 4: Challenging Functions

### Exercise 4.1: Group people by age range
Create a function that groups people into "young" (under 30) and "older" (30+)

```typescript
function groupByAge(people: {name: string, age: number}[]): {
    young: {name: string, age: number}[], 
    older: {name: string, age: number}[]
} {
    let result = {
        young: [] as {name: string, age: number}[],
        older: [] as {name: string, age: number}[]
    };
    
    // Use a loop to categorize each person
    // Add to "young" if age < 30, "older" if age >= 30
    
    return result;
}

// Test it:
console.log("Grouped by age:", groupByAge(people));
```

### Exercise 4.2: Calculate object properties
Create a function that calculates the average age of people

```typescript
function calculateAverageAge(people: {name: string, age: number}[]): number {
    // Calculate the sum of all ages, then divide by the number of people
    // Return 0 if the array is empty
    return 0;
}

// Test it:
console.log("Average age:", calculateAverageAge(people));
```

### Exercise 4.3: Transform objects
Create a function that adds a "category" property to each person based on age

```typescript
function addAgeCategory(people: {name: string, age: number}[]): {
    name: string, 
    age: number, 
    category: string
}[] {
    let result: {name: string, age: number, category: string}[] = [];
    
    // For each person, add a "category" property:
    // "child" if age < 18
    // "adult" if age 18-64
    // "senior" if age 65+
    
    return result;
}

// Test it:
console.log("People with categories:", addAgeCategory(people));
```

---

## 🔥 LEVEL 5: Advanced Functions

### Exercise 5.1: Complex object manipulation
Create a function that sorts people by age and returns only their names

```typescript
function getSortedNames(people: {name: string, age: number}[]): string[] {
    // 1. Sort people by age (youngest first)
    // 2. Extract only the names
    // 3. Return array of names in age order
    return [];
}

// Test it:
console.log("Names sorted by age:", getSortedNames(people));
```

### Exercise 5.2: Multi-condition filtering
Create a function that finds people matching multiple criteria

```typescript
function findPeopleByMultipleCriteria(
    people: {name: string, age: number, city?: string}[], 
    minAge: number, 
    maxAge: number, 
    city?: string
): {name: string, age: number, city?: string}[] {
    let matches: {name: string, age: number, city?: string}[] = [];
    
    // Find people who:
    // - Are between minAge and maxAge (inclusive)
    // - Live in the specified city (if city is provided)
    
    return matches;
}

// Test data with cities:
let peopleWithCities = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 30, city: "London"},
    {name: "Charlie", age: 35, city: "New York"},
    {name: "Diana", age: 28, city: "Paris"}
];

// Test it:
console.log("People 25-32 in New York:", 
    findPeopleByMultipleCriteria(peopleWithCities, 25, 32, "New York"));
```

### Exercise 5.3: Data aggregation
Create a function that creates a summary report of people data

```typescript
function createPeopleReport(people: {name: string, age: number, city?: string}[]): {
    totalPeople: number,
    averageAge: number,
    ageRanges: {
        children: number,
        adults: number,
        seniors: number
    },
    cities: {[cityName: string]: number}
} {
    let report = {
        totalPeople: 0,
        averageAge: 0,
        ageRanges: {
            children: 0,  // under 18
            adults: 0,    // 18-64
            seniors: 0    // 65+
        },
        cities: {} as {[cityName: string]: number}
    };
    
    // Calculate all the statistics using loops
    // Count people in each age range
    // Count people in each city
    // Calculate average age
    
    return report;
}

// Test it:
console.log("People report:", createPeopleReport(peopleWithCities));
```

---

## 💀 LEVEL 6: Expert Functions

### Exercise 6.1: Advanced sorting with multiple criteria
Create a function that sorts people by multiple criteria

```typescript
function advancedSort(people: {name: string, age: number, salary?: number}[]): {
    name: string, 
    age: number, 
    salary?: number
}[] {
    // Sort people by:
    // 1. First by salary (highest first)
    // 2. If salaries are equal, then by age (youngest first)
    // 3. If both salary and age are equal, then by name (alphabetically)
    
    let sorted = [...people]; // Create a copy
    
    // Implement custom sorting logic
    
    return sorted;
}

// Test data:
let employeesData = [
    {name: "Alice", age: 25, salary: 50000},
    {name: "Bob", age: 30, salary: 60000},
    {name: "Charlie", age: 25, salary: 50000},
    {name: "Diana", age: 30, salary: 60000}
];

// Test it:
console.log("Advanced sorted:", advancedSort(employeesData));
```

### Exercise 6.2: Complex data transformation
Create a function that transforms and analyzes nested data

```typescript
function analyzeTeamPerformance(teams: {
    name: string,
    members: {name: string, score: number}[]
}[]): {
    teamName: string,
    averageScore: number,
    topMember: {name: string, score: number},
    memberCount: number
}[] {
    let analysis: {
        teamName: string,
        averageScore: number,
        topMember: {name: string, score: number},
        memberCount: number
    }[] = [];
    
    // For each team:
    // 1. Calculate average score of all members
    // 2. Find the member with highest score
    // 3. Count total members
    // 4. Return analysis for all teams
    
    return analysis;
}

// Test data:
let teamsData = [
    {
        name: "Alpha Team",
        members: [
            {name: "John", score: 85},
            {name: "Sarah", score: 92},
            {name: "Mike", score: 78}
        ]
    },
    {
        name: "Beta Team",
        members: [
            {name: "Lisa", score: 88},
            {name: "Tom", score: 95},
            {name: "Emma", score: 82}
        ]
    }
];

// Test it:
console.log("Team analysis:", analyzeTeamPerformance(teamsData));
```

### Exercise 6.3: Algorithm implementation
Create a function that finds the most frequent element in an array

```typescript
function findMostFrequent<T>(items: T[]): {item: T, count: number} | null {
    // Count how many times each item appears
    // Return the item that appears most often and its count
    // Return null if array is empty
    
    return null;
}

// Test it:
console.log("Most frequent number:", findMostFrequent([1, 2, 3, 2, 4, 2, 5])); 
// Should be {item: 2, count: 3}

console.log("Most frequent name:", findMostFrequent(["Alice", "Bob", "Alice", "Charlie", "Alice"])); 
// Should be {item: "Alice", count: 3}
```

---

## 🏆 FINAL CHALLENGE: Mini Database

Create a complete mini database system for managing students and courses

### Data Structures

```typescript
interface Student {
    id: number;
    name: string;
    age: number;
    grades: {courseId: number, grade: number}[];
}

interface Course {
    id: number;
    name: string;
    credits: number;
}

// Sample data:
let studentsDB: Student[] = [
    {id: 1, name: "Alice", age: 20, grades: [{courseId: 1, grade: 85}, {courseId: 2, grade: 92}]},
    {id: 2, name: "Bob", age: 22, grades: [{courseId: 1, grade: 78}, {courseId: 3, grade: 88}]},
    {id: 3, name: "Charlie", age: 21, grades: [{courseId: 2, grade: 95}, {courseId: 3, grade: 82}]}
];

let coursesDB: Course[] = [
    {id: 1, name: "Mathematics", credits: 3},
    {id: 2, name: "Physics", credits: 4},
    {id: 3, name: "Chemistry", credits: 3}
];
```

### Challenge 1: Calculate GPA for a student

```typescript
function calculateGPA(studentId: number, students: Student[], courses: Course[]): number {
    // 1. Find the student by ID
    // 2. For each grade, multiply grade by course credits
    // 3. Sum all weighted grades and divide by total credits
    // 4. Return GPA (0 if student not found)
    return 0;
}

// Test it:
console.log("Alice's GPA:", calculateGPA(1, studentsDB, coursesDB));
```

### Challenge 2: Find top students in a course

```typescript
function getTopStudentsInCourse(
    courseId: number, 
    students: Student[], 
    limit: number = 3
): {name: string, grade: number}[] {
    // 1. Find all students who took this course
    // 2. Sort by grade (highest first)
    // 3. Return top 'limit' students with their names and grades
    return [];
}

// Test it:
console.log("Top students in Math:", getTopStudentsInCourse(1, studentsDB, 2));
```

### Challenge 3: Comprehensive report function

```typescript
function generateAcademicReport(students: Student[], courses: Course[]): {
    totalStudents: number,
    totalCourses: number,
    averageGPAByStudent: {name: string, gpa: number}[],
    courseStatistics: {courseName: string, averageGrade: number, enrollmentCount: number}[]
} {
    // Create a complete academic report with all statistics
    return {
        totalStudents: 0,
        totalCourses: 0,
        averageGPAByStudent: [],
        courseStatistics: []
    };
}

// Test it:
console.log("Academic Report:", generateAcademicReport(studentsDB, coursesDB));
```

---

## 🎯 Difficulty Levels Summary

| Level | Difficulty | Key Concepts |
|-------|------------|--------------|
| 🟢 Level 1 | Super Easy | Array length, object access, simple loops |
| 🟡 Level 2 | Easy | Sum arrays, count objects, find max |
| 🟠 Level 3 | Medium | Filter arrays, find objects, transform data |
| 🔴 Level 4 | Challenging | Group data, calculate averages, add properties |
| 🔥 Level 5 | Advanced | Sort & transform, multi-criteria filtering, data aggregation |
| 💀 Level 6 | Expert | Complex sorting, nested data analysis, algorithms |
| 🏆 Final Challenge | Master | Real-world complex system |

## 🧠 Skills You'll Develop

### Core TypeScript Skills
- ✅ Function creation with proper TypeScript types
- ✅ Loop mastery (for, while, nested loops)
- ✅ Object manipulation and transformation
- ✅ Array operations (filter, map, sort concepts)
- ✅ Complex data structures and interfaces

### Advanced Programming Concepts
- ✅ Multi-step algorithms and logic
- ✅ Real-world problem solving
- ✅ Data analysis and reporting
- ✅ Performance considerations
- ✅ Code organization and structure

### Professional Development Skills
- ✅ Progressive problem solving
- ✅ Testing and debugging
- ✅ Type safety and error prevention
- ✅ Documentation and code clarity
- ✅ Real-world application development

---

## 📝 Getting Started

1. **Copy the code** from each exercise into your TypeScript environment
2. **Start with Level 1** - don't skip ahead!
3. **Complete each function** before moving to the next
4. **Test your code** with the provided examples
5. **Check your understanding** by modifying the test cases
6. **Move to the next level** only when you're confident

## 💡 Tips for Success

- **Read the comments carefully** - they contain important hints
- **Start simple** - get basic functionality working first
- **Test frequently** - run your code after each small change
- **Don't rush** - understanding is more important than speed
- **Experiment** - try different approaches and see what works
- **Ask questions** - if something isn't clear, research or ask for help

Good luck on your TypeScript journey! 🚀