# Array Methods Exercises

## Exercise 1: Basic Array Manipulation (Easy)
**Goal:** Practice using `push()`, `pop()`, and `length`

Write a function called `manageShoppingList()` that:
- Takes an array of shopping items as a parameter
- Adds "milk" to the end of the list
- Removes the last item from the list
- Returns the final length of the array

```javascript
// Example:
// manageShoppingList(["bread", "eggs", "cheese"]) should return 3
```

---

## Exercise 2: Finding Elements (Easy-Medium)
**Goal:** Practice using `indexOf()` and `includes()`

Write a function called `checkInventory()` that:
- Takes an array of product names and a product to search for
- Returns "Found at position X" if the product exists (where X is the index)
- Returns "Not found" if the product doesn't exist

```javascript
// Example:
// checkInventory(["apple", "banana", "orange"], "banana") should return "Found at position 1"
// checkInventory(["apple", "banana", "orange"], "grape") should return "Not found"
```

---

## Exercise 3: Filtering Data (Medium)
**Goal:** Practice using `filter()` method

Write a function called `filterNumbers()` that:
- Takes an array of numbers
- Returns a new array containing only the numbers that are greater than 10 and even

```javascript
// Example:
// filterNumbers([5, 12, 8, 16, 3, 20, 11]) should return [12, 16, 20]
```

**Bonus:** Create another function `filterWords()` that takes an array of words and returns only words that have more than 5 characters.

---

## Exercise 4: Transforming and Combining (Medium-Hard)
**Goal:** Practice using `map()` and `join()` together

Write a function called `createEmailList()` that:
- Takes an array of first names
- Converts each name to lowercase
- Adds "@school.edu" to each name
- Returns a single string with all emails separated by semicolons

```javascript
// Example:
// createEmailList(["John", "Mary", "Alex"]) should return "john@school.edu;mary@school.edu;alex@school.edu"
```

---

## Exercise 5: Complex Data Processing (Very Challenging)
**Goal:** Combine multiple array methods with complex logic

Write a function called `analyzeTestScores()` that:
- Takes an array of test scores (numbers between 0-100)
- Removes any invalid scores (below 0 or above 100)
- Calculates how many students passed (score >= 60)
- Finds the highest score among passing students
- Returns an array with three elements: [number of valid scores, number of passing students, highest passing score]
- If no students passed, the highest passing score should be 0

```javascript
// Example:
// analyzeTestScores([85, 92, 45, 67, 105, -5, 78, 55, 90])
// Should return [7, 5, 92]
// 
// Explanation:
// - 7 valid scores (removed 105 and -5)
// - 5 passing students (85, 92, 67, 78, 90)
// - 92 is the highest passing score
```

**Extra Challenge:** Modify the function to also return the average score of passing students as a fourth element, rounded to 1 decimal place.

---

## Hints for Students:
- **Exercise 1:** Remember that `push()` adds to the end, `pop()` removes from the end
- **Exercise 2:** `indexOf()` returns -1 if not found, `includes()` returns true/false
- **Exercise 3:** Use `filter()` with a function that checks two conditions with `&&`
- **Exercise 4:** Use `map()` first to transform, then `join()` to combine
- **Exercise 5:** Break this down into steps - filter first, then use other methods on the filtered array

## Array Methods You'll Need:
- `push()` - adds element to end
- `pop()` - removes element from end  
- `indexOf()` - finds index of element
- `includes()` - checks if element exists
- `filter()` - creates new array with elements that pass a test
- `map()` - creates new array by transforming each element
- `join()` - combines array elements into a string
- `length` - property that gives array size