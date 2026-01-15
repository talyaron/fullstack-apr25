const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const catRoutes = require('./routes/cats');

const app = express();
const PORT = process.env.PORT || 5000;

// Timestamp logger helper
const log = (message) => console.log(`[${new Date().toISOString()}] ${message}`);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('[:date[iso]] :method :url :status :response-time ms'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catcollection';

mongoose.connect(MONGODB_URI)
  .then(() => log('Connected to MongoDB'))
  .catch(err => console.error(`[${new Date().toISOString()}] MongoDB connection error:`, err));

// Routes
app.use('/api/cats', catRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Cat Collection API is running' });
});

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
