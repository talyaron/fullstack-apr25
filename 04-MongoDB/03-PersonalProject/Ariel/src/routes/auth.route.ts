// src/routes/auth.route.ts
import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller';

const router = express.Router();

// POST /api/auth/register - רישום משתמש חדש
router.post('/register', register);

// POST /api/auth/login - התחברות משתמש
router.post('/login', login);

// GET /api/auth/me - קבלת פרטי משתמש מחובר
router.get('/me', getMe);

export default router;