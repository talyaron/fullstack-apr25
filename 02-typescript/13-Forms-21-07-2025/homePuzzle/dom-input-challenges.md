# Leveled Input & DOM Challenges

Progressive difficulty levels from beginner to advanced using **Data-Controllers-View Architecture**

## Architecture Guidelines
Structure your code following this pattern:
```javascript
// Data (Interface & State)
interface YourDataType {
    // Define your data structure here
}
const yourData: YourDataType[] = [];

// Controllers (Event Handlers)
function handleInputChange(event: Event): void {
    try {
        // Handle the event
        // Update data
        // Call view functions to render
    } catch (error) {
        console.error('Error:', error);
    }
}

// View (HTML Generation & DOM Rendering)
function htmlYourItem(item: YourDataType): string {
    try {
        // Return HTML string for single item
    } catch (error) {
        console.error("Error generating HTML:", error);
        return `<div class="error">Error rendering item</div>`;
    }
}

function renderYourItems(items: YourDataType[]): void {
    try {
        const root = document.getElementById("yourRoot");
        if (!root) throw new Error("Root element not found");
        root.innerHTML = items.map(item => htmlYourItem(item)).join("");
    } catch (error) {
        console.error("Error rendering items:", error);
    }
}
```

Progressive difficulty levels from beginner to advanced:

## Level 1: Very Easy (Beginner)

### Challenge 1.1: Name Display
**Input**: text (name)
**Task**: Show user's name in a styled card as they type
**Skills**: Basic text input, real-time DOM update
**Architecture Focus**: 
- Create interface for user data
- Controller function to handle input changes
- View functions: `htmlNameCard()` and `renderNameCard()`

### Challenge 1.2: Color Theme Selector
**Input**: color (theme color)
**Task**: Change page theme color and show color code
**Skills**: Color picker, basic styling
**Architecture Focus**:
- Interface for theme data
- Controller for color change events
- View functions to render color display and apply styling

## Level 2: Medium (Intermediate)

### Challenge 2.1: Task Manager
**Inputs**: text (task name), select (priority: Low/Medium/High), checkbox (completed)
**Task**: Add tasks to a list, mark as complete, show completion statistics
**Skills**: Form handling, list manipulation, data validation
**Architecture Focus**: 
- Task interface with required fields
- Form controller using FormData and preventDefault()
- View functions: `htmlTask()` and `renderTasks()`
- Input validation and error handling

### Challenge 2.2: Product Catalog
**Inputs**: text (product name), number (price), text (image URL), select (category)
**Task**: Add products to catalog, display with images, calculate total value
**Skills**: Multiple input types, form submission, data processing
**Architecture Focus**:
- Product interface with typed properties
- Form controller with data parsing (parseFloat for numbers)
- View functions for product cards and statistics
- Error handling for invalid data

## Level 3: Hard (Advanced)

### Challenge 3.1: Student Grade System
**Inputs**: text (student name), email (student email), number (test1), number (test2), number (test3), text (image URL), select (grade level)
**Task**: Add students, calculate average grades, display grade cards, filter by grade level, show class statistics
**Skills**: Complex form handling, calculations, filtering, data validation
**Architecture Focus**:
- Student interface with multiple typed properties
- Complex form controller with comprehensive validation
- Multiple view functions: `htmlStudent()`, `renderStudents()`, `renderStatistics()`
- Advanced error handling and data parsing
- Array filtering and statistical calculations

### Challenge 3.2: Event Management System
**Inputs**: text (event name), date (event date), time (start time), time (end time), textarea (description), text (location), number (max attendees), checkbox (public event), file (event image)
**Task**: Create events, validate dates/times, handle file uploads, show upcoming events, manage attendee limits
**Skills**: File handling, date/time validation, complex data structures, advanced form processing
**Architecture Focus**:
- Event interface with complex data types
- Advanced form controller with file handling and date validation
- Sophisticated view rendering with conditional displays
- Error handling for file uploads and date logic
- Complex business logic for event management