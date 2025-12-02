# Dream Journal React Client

A notebook-style React app for recording dreams, with login, page flipping, and per-page date selection.

## Features
- Login form (email + password, local state only)
- Notebook UI with 30 pages
- Flip pages left/right (two pages at a time)
- Set a date for each page
- Write text on each line
- Sign out button
- Responsive, book-like design
- Accessibility: aria-labels on buttons and date inputs, keyboard navigation

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app (Vite dev server):
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
my-react-app/
  src/
    App.jsx        # Main app logic
    App.css        # Styles
    LoginForm.jsx  # Login form component
    components/
      Notebook.jsx # Notebook UI (if split)
    ...
```

## Accessibility
- All interactive controls have `aria-label`s.
- Keyboard navigation: use Tab to focus, Enter to submit, and arrow keys to flip pages (if implemented).
- Color contrast meets WCAG guidelines.

## Limitations & Future Improvements
- Login is local only (no backend/auth).
- No data persistence (refreshing loses notebook data).
- No tests yet (see CONTRIBUTING.md for how to add).
- Future: connect to backend, add dream search, tags, and statistics.

## Author & Contributing
- Created by [Your Name]
- See `CONTRIBUTING.md` for guidelines.

---
MIT License
