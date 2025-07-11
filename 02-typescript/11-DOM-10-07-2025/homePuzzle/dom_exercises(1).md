# DOM Manipulation Exercises

## Exercise 1: Basic Element Selection and Text Content

**Objective:** Practice selecting elements and changing their text content with proper error handling.

**Setup:** Create an HTML file with the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 1</title>
</head>
<body>
    <h1 id="main-title">Welcome to My Website</h1>
    <h2 id="sub-title">Original Subtitle</h2>
    <p class="description">This is a description paragraph.</p>
    <p id="info">Page information</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Create a function `updateMainTitle(newTitle: string): void` that:
   - Uses `document.getElementById()` to select the main title
   - Includes proper null checking with error throwing
   - Changes the `innerText` to the new title
   - Includes try-catch error handling
2. Create a function `updateSubTitle(newSubTitle: string): void` using `document.querySelector()` instead
3. Call both functions with new text values
4. Use `console.dir()` to inspect one of the selected elements

---

## Exercise 2: Working with Multiple Elements and Styling

**Objective:** Practice using `querySelectorAll`, loops, and inline styling.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 2</title>
</head>
<body>
    <h2>Color List</h2>
    <p class="color-item">Red</p>
    <p class="color-item">Blue</p>
    <p class="color-item">Green</p>
    <p class="color-item">Yellow</p>
    <p class="color-item">Purple</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Create a function `updateColorItems(): void` that:
   - Uses `document.querySelectorAll()` to select all color items
   - Checks if any elements were found (length > 0)
   - Uses `forEach()` to loop through elements with proper type checking (`instanceof HTMLParagraphElement`)
   - Updates each element's text to include its index: "Color 1: Red", "Color 2: Blue", etc.
   - Sets a different background color for each item using `element.style.backgroundColor`
2. Create a helper function `getRandomColor(): string` that generates random hex colors
3. Apply random text colors to each element using the helper function

---

## Exercise 3: Element Styling with Type Safety

**Objective:** Practice element selection with proper TypeScript type checking and styling.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 3</title>
</head>
<body>
    <h2>Text Styling</h2>
    <p id="highlight-text">This text will be highlighted</p>
    <p id="big-text">This text will be enlarged</p>
    <p id="colored-text">This text will be colored</p>
    <div id="info-box">Information box</div>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Create a function `styleHighlightText(): void` that:
   - Selects the highlight text element
   - Uses proper type checking with `instanceof HTMLElement`
   - Sets background color to yellow and font weight to bold
2. Create a function `enlargeText(fontSize: string): void` that:
   - Selects the big text element with null checking
   - Sets the font size using the parameter (e.g., "2em", "24px")
3. Create a function `colorizeText(textColor: string, bgColor: string = "white"): void` with default parameters
4. Style the info box with border, padding, and margin using inline styles

---

## Exercise 4: Advanced Element Manipulation

**Objective:** Practice working with different element types and attributes.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 4</title>
</head>
<body>
    <h2>Media Manager</h2>
    <img id="main-image" src="https://picsum.photos/200/200?random=1" alt="Random Image" width="200">
    <a id="main-link" href="https://www.example.com" target="_blank">Visit Example</a>
    <div id="status-display">Status: Ready</div>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Create a function `updateImage(newSrc: string, newAlt: string, newWidth: number): void` that:
   - Selects the image using `getElementById()`
   - Uses type checking with `instanceof HTMLImageElement`
   - Updates src, alt, and width attributes
   - Includes proper error handling
2. Create a function `updateLink(newHref: string, newText: string): void` for the anchor element
3. Create a function `updateStatus(message: string, color: string): void` that updates the status display
4. Call all functions with appropriate values and use `console.dir()` to inspect the modified elements

---

## Exercise 5: Comprehensive DOM Manipulation

**Objective:** Combine all concepts in a more complex scenario.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 5</title>
</head>
<body>
    <h1 id="page-title">Product Showcase</h1>
    <div class="product" id="product-1">
        <h3 class="product-name">Laptop</h3>
        <p class="price" id="price-1">$999</p>
        <p class="description">High-performance laptop</p>
    </div>
    <div class="product" id="product-2">
        <h3 class="product-name">Mouse</h3>
        <p class="price" id="price-2">$25</p>
        <p class="description">Wireless mouse</p>
    </div>
    <div class="product" id="product-3">
        <h3 class="product-name">Keyboard</h3>
        <p class="price" id="price-3">$75</p>
        <p class="description">Mechanical keyboard</p>
    </div>
    <div id="summary">Product summary will appear here</div>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Create a function `updateProductPrices(): void` that:
   - Selects all price elements using `querySelectorAll()`
   - Applies a 10% discount to each price
   - Updates the text content with "Sale: $XXX" format
   - Changes text color to red for sale prices
2. Create a function `highlightProducts(): void` that:
   - Selects all product name elements
   - Uses `forEach` with proper type checking
   - Adds "⭐ " prefix to each product name
   - Sets different background colors for each product
3. Create a function `generateSummary(): void` that:
   - Counts total number of products
   - Calculates average price (you'll need to parse the prices)
   - Updates the summary div with this information
4. Create a function `applyRandomStyles(): void` that applies random colors to various elements
5. Call all functions and add comprehensive error handling

**Bonus Challenge:**
Create a function that uses `setInterval()` to change the page title color every 2 seconds, cycling through different colors.

---

## Tips for Students:

1. **Always use proper TypeScript types** - `HTMLElement`, `HTMLParagraphElement`, `HTMLImageElement`, etc.
2. **Include null checking** - Always check if elements exist before manipulating them
3. **Use try-catch blocks** for error handling in your functions
4. **Use `console.dir()`** to inspect DOM elements and see all their properties
5. **Prefer `innerText`** over `textContent` for simple text updates
6. **Use `instanceof`** to check element types before manipulation
7. **Create helper functions** for reusable code like color generation
8. **Use default parameters** in functions where appropriate

## Key Methods and Properties to Remember:

- `document.getElementById('id')` - Select by ID (returns single element or null)
- `document.querySelector('#id')` - Alternative selection method
- `document.querySelectorAll('.class')` - Select multiple elements
- `element.innerText = "text"` - Change text content
- `element.style.property = "value"` - Set inline CSS styles
- `element instanceof HTMLElementType` - Type checking
- `console.dir(element)` - Inspect DOM element properties
- `setInterval(callback, milliseconds)` - Repeat function calls