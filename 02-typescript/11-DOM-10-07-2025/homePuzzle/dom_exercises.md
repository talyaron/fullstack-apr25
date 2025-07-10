# DOM Manipulation Exercises

## Exercise 1: Basic Element Selection and Text Content

**Objective:** Practice selecting elements and changing their text content.

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
    <p class="description">This is a description paragraph.</p>
    <p id="info">Page information</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Select the element with id `main-title` and change its text to "Hello TypeScript!"
2. Select the element with class `description` and change its text to "Learning DOM manipulation is fun!"
3. Select the element with id `info` and change its text to "Updated by TypeScript"
4. Create a variable to store the original title text before changing it
5. Log all the selected elements to the console using `console.log()`

---

## Exercise 2: Working with Multiple Elements

**Objective:** Practice using `querySelectorAll` and working with arrays of elements.

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
    <h2>Favorite Colors</h2>
    <ul>
        <li class="color-item">Red</li>
        <li class="color-item">Blue</li>
        <li class="color-item">Green</li>
        <li class="color-item">Yellow</li>
        <li class="color-item">Purple</li>
    </ul>
    <p id="color-count">Count will appear here</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Select all elements with class `color-item` using `querySelectorAll`
2. Log the number of color items to the console
3. Loop through the selected elements and add "Color: " before each color name
4. Update the color count paragraph to show how many colors there are
5. Change the text content of the second color item (index 1) to "Dark Blue"

---

## Exercise 3: Element Styling and Classes

**Objective:** Practice changing element styles and working with CSS classes.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 3</title>
    <style>
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
        .hidden {
            display: none;
        }
        .large-text {
            font-size: 24px;
        }
        .red-text {
            color: red;
        }
    </style>
</head>
<body>
    <h2>Style Manipulation</h2>
    <p id="main-text">This is the main text paragraph.</p>
    <p class="secondary-text">This is secondary text.</p>
    <p class="secondary-text">This is another secondary text.</p>
    <p class="secondary-text">This is the third secondary text.</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Select the main text paragraph and add the "highlight" class to it
2. Select all secondary text paragraphs and add the "red-text" class to each one
3. Add the "large-text" class to the first secondary text paragraph
4. Hide the last secondary text paragraph by adding the "hidden" class
5. Log to console which classes each element now has

---

## Exercise 4: Element Attributes and Properties

**Objective:** Practice working with element attributes and properties.

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
    <h2>Image and Link Manager</h2>
    <img id="main-image" src="https://picsum.photos/200/200?random=1" alt="Random Image 1" width="200">
    
    <div>
        <a id="main-link" href="https://www.example.com" target="_blank">Visit Example</a>
    </div>
    
    <p id="info-display">Image info will appear here</p>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Select the image and change its `src` to "https://picsum.photos/300/300?random=5"
2. Change the image's `alt` attribute to "A beautiful random image"
3. Change the image's width to 300 pixels
4. Select the link and change its `href` to "https://www.google.com"
5. Change the link's text content to "Visit Google"
6. Update the info display to show the current image's alt text

---

## Exercise 5: Combining Multiple Concepts

**Objective:** Practice combining element selection, text manipulation, and styling.

**Setup:** Create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise 5</title>
    <style>
        .product {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px 0;
        }
        .sale {
            background-color: lightgreen;
            font-weight: bold;
        }
        .out-of-stock {
            background-color: lightcoral;
            color: white;
        }
        .featured {
            border: 3px solid gold;
        }
    </style>
</head>
<body>
    <h2>Product Catalog</h2>
    
    <div class="product" id="product-1">
        <h3 class="product-name">Laptop</h3>
        <p class="price">$999</p>
        <p class="status">In Stock</p>
    </div>
    
    <div class="product" id="product-2">
        <h3 class="product-name">Mouse</h3>
        <p class="price">$25</p>
        <p class="status">Available</p>
    </div>
    
    <div class="product" id="product-3">
        <h3 class="product-name">Keyboard</h3>
        <p class="price">$75</p>
        <p class="status">In Stock</p>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

**Tasks:**
1. Change the first product's price to "$799" and add the "sale" class to the entire product
2. Change the second product's status to "Out of Stock" and add the "out-of-stock" class to it
3. Add the "featured" class to the third product
4. Select all product names and add "⭐ " at the beginning of each name
5. Count how many products have the word "Stock" in their status and log this to console
6. Change all prices to include "USD" at the end (e.g., "$999 USD")

---

## Tips for Students:

1. **Start with the HTML structure** - Make sure you understand the elements you're working with
2. **Use `console.log()`** to debug and see what elements you're selecting
3. **Test each task individually** before moving to the next one
4. **Remember the difference between `querySelector` and `querySelectorAll`**
5. **When using `querySelectorAll`, remember you get a list that you need to loop through**
6. **Use TypeScript types when possible** (e.g., `HTMLImageElement`, `HTMLAnchorElement`)
7. **Don't forget to handle null cases** when selecting elements that might not exist

## Key Methods to Remember:

- `document.querySelector('#id')` - Select by ID
- `document.querySelector('.class')` - Select by class (first match)
- `document.querySelectorAll('.class')` - Select all elements with class
- `element.textContent = "new text"` - Change text content
- `element.classList.add('class-name')` - Add a CSS class
- `element.setAttribute('attribute', 'value')` - Set an attribute
- `element.src = "new-url"` - Change image source (or other attributes directly)