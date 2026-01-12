const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const catRoutes = require('./routes/cats');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catcollection';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cats', catRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Cat Collection API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
