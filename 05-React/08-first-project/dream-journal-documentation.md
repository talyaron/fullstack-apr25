# 🌙 Dream Journal

A full-stack web application for recording, tagging, and analyzing your dreams over time.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Future Enhancements](#future-enhancements)

---

## Overview

Dream Journal is a personal diary application specifically designed for recording dreams. Users can document their dreams immediately upon waking, tag them with recurring themes, track their emotional state, and discover patterns in their dream life over time.

The application provides insights through statistics and visualizations, helping users understand their subconscious patterns and recurring dream themes.

---

## Features

### Core Features

- **Dream Recording** - Write detailed dream entries with title, description, and date
- **Clarity Rating** - Rate how vivid/clear the dream was (1-5 scale)
- **Mood Tracking** - Record your emotional state after each dream
- **Tagging System** - Add custom tags with auto-suggestions from existing tags
- **Favorites** - Mark special dreams for quick access

### Discovery Features

- **Search** - Full-text search across all dream entries
- **Filters** - Filter by tags, date range, mood, or clarity level
- **Statistics** - View most common tags, dream frequency, mood patterns
- **Timeline View** - Browse dreams chronologically

### User Experience

- **Dark Mode** - Eye-friendly interface for early morning use
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Quick Entry** - Streamlined form for fast dream recording

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Styling | CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |

---

## Project Structure

```
dream-journal/
│
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── DreamCard.jsx
│   │   │   ├── DreamForm.jsx
│   │   │   ├── DreamList.jsx
│   │   │   ├── TagInput.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── MoodSelector.jsx
│   │   │   ├── ClarityRating.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AddDream.jsx
│   │   │   ├── EditDream.jsx
│   │   │   ├── DreamDetail.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── styles/             # SCSS files
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _components.scss
│   │   │   ├── _pages.scss
│   │   │   └── main.scss
│   │   │
│   │   ├── context/            # React context
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/           # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── dreamService.js
│   │   │
│   │   ├── utils/              # Helper functions
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   │
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   └── Dream.js
│   │
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   └── dreams.js
│   │
│   ├── middleware/             # Custom middleware
│   │   └── auth.js             # JWT verification
│   │
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   └── dreamController.js
│   │
│   ├── server.js               # Entry point
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
    // Hashed with bcrypt
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Dream Model

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxLength: 100
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  clarity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'scared', 'confused', 'peaceful', 'anxious', 'excited', 'neutral']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  isFavorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/auth/me` | Get current user info | Yes |

#### Register Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login Request Body
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Example requests (cURL)

Register a new user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"securepassword123"}'
```

Login and get token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword123"}'
```

Create a dream (authenticated):

```bash
curl -X POST http://localhost:5000/api/dreams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"Flying","content":"I flew over mountains","date":"2024-01-15","clarity":4,"mood":"peaceful","tags":["flying","mountains"]}'
```

List dreams (authenticated):

```bash
curl -X GET http://localhost:5000/api/dreams \
  -H "Authorization: Bearer <TOKEN>"
```


### Dream Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dreams` | Get all user's dreams | Yes |
| GET | `/api/dreams/:id` | Get single dream | Yes |
| POST | `/api/dreams` | Create new dream | Yes |
| PUT | `/api/dreams/:id` | Update dream | Yes |
| DELETE | `/api/dreams/:id` | Delete dream | Yes |
| PATCH | `/api/dreams/:id/favorite` | Toggle favorite status | Yes |
| GET | `/api/dreams/favorites` | Get all favorite dreams | Yes |
| GET | `/api/dreams/tags` | Get all unique tags | Yes |
| GET | `/api/dreams/stats` | Get dream statistics | Yes |
| GET | `/api/dreams/search` | Search dreams | Yes |

#### Create Dream Request Body
```json
{
  "title": "Flying Over Mountains",
  "content": "I was flying over beautiful snow-capped mountains...",
  "date": "2024-01-15",
  "clarity": 4,
  "mood": "peaceful",
  "tags": ["flying", "mountains", "nature"]
}
```

#### Search Query Parameters
```
GET /api/dreams/search?q=flying&tags=nature,water&mood=happy&from=2024-01-01&to=2024-12-31
```

#### Statistics Response
```json
{
  "totalDreams": 47,
  "dreamsThisMonth": 12,
  "averageClarity": 3.4,
  "topTags": [
    { "tag": "flying", "count": 15 },
    { "tag": "water", "count": 12 },
    { "tag": "family", "count": 8 }
  ],
  "moodDistribution": {
    "happy": 10,
    "scared": 8,
    "confused": 15,
    "peaceful": 14
  },
  "dreamsByMonth": [
    { "month": "2024-01", "count": 8 },
    { "month": "2024-02", "count": 12 }
  ]
}
```

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dream-journal.git
   cd dream-journal
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables** (see next section)

5. **Run the application** (see Running section)

---

## Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/dream-journal

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

---

## Running the Application

### Development Mode

**Start the server:**
```bash
cd server
npm run dev
```

**Start the client (in a new terminal):**
```powershell
cd client
npm run dev
```

The application will be available at (defaults):
- Frontend (Vite dev server): `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Production Mode

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

---

## UI Screens Description

### 1. Login Page (`Login.jsx`)
- Email input field
- Password input field
- Login button
- Link to Register page
- Dark mode compatible design

### 2. Register Page (`Register.jsx`)
- Name input field
- Email input field
- Password input field
- Register button
- Link to Login page

### 3. Home Page (`Home.jsx`)
- **Navbar** with navigation links and dark mode toggle
- **SearchBar** component for full-text search
- **Filter controls** (by tags, date range, mood, clarity)
- **DreamList** displaying DreamCard components
- Timeline/chronological view of dreams
- Quick access to add new dream

### 4. Add Dream Page (`AddDream.jsx`)
- **DreamForm** with:
  - Title input (max 100 chars)
  - Content/description textarea
  - Date picker
  - **ClarityRating** component (1-5 stars/scale)
  - **MoodSelector** component (8 mood options: happy, sad, scared, confused, peaceful, anxious, excited, neutral)
  - **TagInput** component with auto-suggestions
- Save button

### 5. Edit Dream Page (`EditDream.jsx`)
- Same form as Add Dream, pre-filled with existing data
- Update and Delete buttons

### 6. Dream Detail Page (`DreamDetail.jsx`)
- Full dream title and content
- Date, clarity rating, mood display
- Tags displayed as chips/badges
- Favorite toggle button (star/heart icon)
- Edit and Delete action buttons

### 7. Favorites Page (`Favorites.jsx`)
- List of dreams marked as favorite
- Same DreamCard layout as Home
- Quick unfavorite option

### 8. Statistics Page (`Statistics.jsx`)
- **Stats** component showing:
  - Total dreams count
  - Dreams this month
  - Average clarity score
  - **Top tags** visualization (bar chart or cloud)
  - **Mood distribution** chart (pie/donut chart)
  - **Dreams by month** timeline chart
  - Dream frequency patterns

---

### Shared Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Navigation, dark mode toggle, user info |
| `DreamCard` | Card preview with title, date, mood, tags, favorite icon |
| `DreamList` | Container rendering multiple DreamCards |
| `SearchBar` | Search input with filter options |
| `DreamForm` | Reusable form for Add/Edit pages |
| `TagInput` | Tag input with auto-suggestions from existing tags |
| `MoodSelector` | Dropdown or icon selector for 8 mood options |
| `ClarityRating` | 1-5 star/scale rating component |
| `Stats` | Statistics display with charts |

---

## Future Enhancements

- [ ] **Dream Interpretation AI** - Integrate AI to suggest possible dream meanings
- [ ] **Lucid Dream Tracker** - Special marking for lucid dreams with techniques
- [ ] **Sleep Quality Integration** - Connect with sleep tracking apps
- [ ] **Export to PDF** - Generate a personal dream book
- [ ] **Recurring Dream Detection** - Automatic identification of similar dreams
- [ ] **Dream Sharing** - Optional anonymous sharing with community
- [ ] **Morning Reminder** - Push notifications to record dreams
- [ ] **Voice Recording** - Record dreams by voice, transcribe later
- [ ] **Dream Calendar** - Visual calendar view of dream frequency
- [ ] **Backup & Sync** - Cloud backup of dream data

---

## Testing

This project doesn't include comprehensive tests yet. Suggested quick start:

- Frontend: add Jest + React Testing Library and add a couple of component tests (login flow, notebook rendering).
- Backend: add a small test suite using Jest or Mocha and supertest for route integration tests.

Example commands to add locally:

```bash
# install testing deps for client
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# run tests
npm test
```

Add tests and a test script in `package.json` to run them in CI.

## Accessibility & Performance Notes

- Add `aria-label`s to interactive controls (buttons, inputs). Ensure keyboard navigation works for page flip (left/right arrows).
- Keep color-contrast ratios accessible (use contrast-checker tools).
- For large data sets, add pagination or virtualized lists to keep the UI responsive.

## Security Notes

- Keep secrets out of source control — use `.env` and `.env.example` as templates.
- For production recommend storing JWTs in httpOnly cookies or implementing CSRF protections if using localStorage.
- Sanitize user input on the server and add rate-limiting.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

Built as an educational project demonstrating full-stack development with the MERN stack (MongoDB, Express, React, Node.js) plus SCSS styling.
