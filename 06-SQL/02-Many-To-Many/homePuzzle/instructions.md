Here are 10 exercises designed to test your knowledge of MySQL aggregation, filtering, and joining, based on the books, authors, and tags tables we've been working with.

Level: Beginner (Warm-up)
1. The Basic Count Write a query to find the total number of books in the books table.

Keywords: COUNT

2. Finding the Average Calculate the average price of all books in the store.

Keywords: AVG

3. Pattern Matching (Authors) Find all books where the title starts with the word "The".

Keywords: LIKE, %

4. The Price Range List all books that have a price between 30 and 60.

Keywords: BETWEEN or AND

Level: Intermediate (Grouping & Logic)
5. Authors and their Catalog Show a list of author_ids and how many books each author has written.

Keywords: COUNT, GROUP BY

6. Expensive vs. Cheap Find the highest (MAX) and lowest (MIN) price among books published after the year 2000.

Keywords: MAX, MIN, WHERE

7. Specific Name Search Find all authors whose last name contains the letter 'a' (case-insensitive).

Keywords: LIKE

8. Filtering Aggregates Show the author_ids for only those authors who have written more than 2 books.

Keywords: GROUP BY, HAVING, COUNT

Level: Advanced (Joins & Complex Logic)
9. The Author's Average Join the books and authors tables to show the Author's Full Name (First + Last) and their average book price.

Keywords: JOIN, CONCAT, GROUP BY, AVG

10. The Ultimate Filter Find the total number of books that have the tag "Fiction", were published in an even year, and cost more than the average price of all books.

Keywords: JOIN, COUNT, Subquery, % (Modulo)

---

## Fullstack Exercise: Author Statistics Dashboard

Based on Exercise #5: "Authors and their Catalog"

### Overview
Build a fullstack application that displays author statistics from the library database.

#### The User Can:
- **View** all authors with their book counts in a table
- **Search** for authors by name
- **Sort** the table by clicking on column headers (Name or Book Count)
- **Toggle** sort direction between ascending and descending

---

### ⚠️ IMPORTANT: Server-Side Operations

**ALL filtering and sorting MUST be done on the SERVER (database), NOT in the browser!**

| ❌ WRONG (Client-Side) | ✅ CORRECT (Server-Side) |
|------------------------|--------------------------|
| Fetch all data, then filter with JavaScript | Send search term to backend, filter with SQL `WHERE`/`HAVING` |
| Fetch all data, then sort with `.sort()` | Send sort params to backend, sort with SQL `ORDER BY` |
| Data processing happens in React | Data processing happens in MySQL |

**Why Server-Side?**
- In real applications, databases have millions of rows
- You can't load all data into the browser
- Databases are optimized for filtering and sorting
- This is how professional applications work

---

### Backend (Node.js + Express)

Create an Express server with the following endpoint:

#### `GET /api/authors/stats`

Returns a list of authors with their book counts. Supports **sorting** and **searching** via query parameters.

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Filter authors by name (searches first_name and last_name) | `?search=king` |
| `sortBy` | string | Column to sort by: `name` or `book_count` | `?sortBy=name` |
| `order` | string | Sort direction: `asc` or `desc` (default: `desc`) | `?order=asc` |

**Example Requests:**
```
GET /api/authors/stats                           # All authors, default sort
GET /api/authors/stats?search=stephen            # Search by name
GET /api/authors/stats?sortBy=name&order=asc     # Sort by name A-Z
GET /api/authors/stats?sortBy=book_count&order=desc  # Sort by most books
GET /api/authors/stats?search=a&sortBy=name      # Combined search + sort
```

**Expected Response:**
```json
[
  {
    "author_id": 1,
    "first_name": "Stephen",
    "last_name": "King",
    "book_count": 4
  },
  {
    "author_id": 2,
    "first_name": "Agatha",
    "last_name": "Christie",
    "book_count": 3
  }
]
```

**SQL Hints:**

Base query:
```sql
SELECT
    a.author_id,
    a.first_name,
    a.last_name,
    COUNT(b.book_id) AS book_count
FROM authors a
LEFT JOIN books b ON a.author_id = b.author_id
GROUP BY a.author_id, a.first_name, a.last_name
ORDER BY book_count DESC;
```

With search (add HAVING clause after GROUP BY):
```sql
HAVING a.first_name LIKE '%search_term%'
   OR a.last_name LIKE '%search_term%'
```

With dynamic sort:
```sql
ORDER BY book_count DESC   -- or ASC
ORDER BY a.last_name ASC   -- for name sorting
```

**Important:** Use parameterized queries to prevent SQL injection when using the search term!

---

### Frontend (React)

Create a React application that:

1. **Fetches** the author statistics from the backend on page load
2. **Displays** the data in a table or card layout
3. **Shows** each author's full name and their book count
4. **Allows sorting** by clicking table headers or buttons
5. **Allows searching** by typing in a search input

#### UI Requirements:
- Display a header: "Author Statistics"
- Show a loading state while fetching data
- Display authors in a table with columns: **Author Name** | **Books Written**

#### Search Feature:
- Add a search input field above the table
- When user types, send the search term to the backend via query parameter
- Use **debouncing** (300ms delay) to avoid sending too many requests while typing
- The search should filter from the DATABASE, not just filter the displayed data

#### Sorting Feature:
- Make table headers clickable to sort by that column
- Show an indicator (arrow) for current sort direction
- Clicking the same header toggles between ASC and DESC
- Sorting should happen in the DATABASE via query parameters

#### Example Component Structure:
```jsx
function AuthorStats() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('book_count');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    // Fetch with query params: ?search=...&sortBy=...&order=...
  }, [search, sortBy, order]);

  // ... render table with search input and clickable headers
}
```

---

### Project Structure

```
fullstack-exercise/
├── server/
│   ├── index.js          # Express server
│   ├── package.json
│   └── .env              # DB connection config
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   └── AuthorStats.jsx
    │   └── main.jsx
    └── package.json
```

---

### Steps to Complete

#### Step 1: Backend Setup
1. Initialize a new Node.js project in `server/`
2. Install dependencies: `express`, `mysql2`, `cors`, `dotenv`
3. Create the Express server with the `/api/authors/stats` endpoint
4. Connect to the MySQL `library` database
5. Execute the SQL query and return the results

#### Step 2: Frontend Setup
1. Create a React app in `client/` using Vite
2. Create an `AuthorStats` component
3. Use `useEffect` to fetch data on mount
4. Use `useState` to store the authors data
5. Render the data in a table

#### Step 3: Integration
1. Run backend on port `3000`
2. Run frontend on port `5173` (Vite default)
3. Make sure CORS is enabled on the backend
4. Test the full flow

---

### Bonus Challenges
- **Click to Expand**: When clicking an author row, show a list of their book titles
- **Pagination**: Add pagination to handle large datasets (LIMIT/OFFSET in SQL)
- **Highlight**: Highlight the search term in the results

---

### Evaluation Criteria
- [ ] Backend endpoint returns correct data
- [ ] SQL query uses proper JOIN and GROUP BY
- [ ] **Search works from database** (not client-side filtering)
- [ ] **Sorting works from database** (not client-side sorting)
- [ ] Search input has debouncing implemented
- [ ] Sort indicators show current sort state
- [ ] Frontend displays data correctly
- [ ] Loading state is implemented
- [ ] SQL injection is prevented (parameterized queries)
- [ ] Code is clean and organized

Good luck!