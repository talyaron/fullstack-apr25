import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/ database';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

// טעינת משתני סביבה
dotenv.config();

// התחברות למסד נתונים
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// הגשת קבצים סטטיים מתיקיית public
app.use('/dist', express.static(path.join(__dirname, '../public/dist')));
app.use(express.static(path.join(__dirname, '../public')));

// נתיבי API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// נתיבי HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// טיפול בשגיאות 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'הנתיב לא נמצא'
  });
});

// טיפול בשגיאות כלליות
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'שגיאת שרת',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 השרת רץ על פורט ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});