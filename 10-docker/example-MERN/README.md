# Cat Collection - MERN App

A simple MERN (MongoDB, Express, React, Node.js) application for collecting cat images.

## Project Structure

```
example/
├── backend/
│   ├── models/
│   │   └── Cat.js
│   ├── routes/
│   │   └── cats.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── CatForm.js
    │   │   └── CatList.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Features

- Add cat images with name, breed, and description
- View all cats in a responsive grid layout
- Edit existing cat entries
- Delete cats from collection
- RESTful API backend

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | /api/cats     | Get all cats      |
| GET    | /api/cats/:id | Get single cat    |
| POST   | /api/cats     | Create new cat    |
| PUT    | /api/cats/:id | Update cat        |
| DELETE | /api/cats/:id | Delete cat        |

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
