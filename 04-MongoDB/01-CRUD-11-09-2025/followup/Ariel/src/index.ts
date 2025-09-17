import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const port = 3000;

// חיבור למונגו ישירות
mongoose.connect('mongodb+srv://Ari7:Ahfh72@cluster0.y0awkmn.mongodb.net/students-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

import studentRoutes from './routes/students.route';
app.use('/api/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});