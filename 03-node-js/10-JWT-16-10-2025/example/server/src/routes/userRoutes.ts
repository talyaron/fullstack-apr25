import express from 'express';
import User from '../models/User';
import { anonymousUserMiddleware } from '../middleware/userMiddlware';
import jwt from "jwt-simple";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is missing in environment variables!");
  process.exit(1);
}



const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Set cookie
    // res.cookie('userId', (user._id as any).toString(), {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
    //   sameSite: 'strict'
    // });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User or password incorrect' });
    }

    // Check password
    if (password !== user.password) {
      return res.status(401).json({ error: 'User or password incorrect' });
    }

    //encrypt cookie with JWT
    if(!JWT_SECRET){
        return res.status(500).json({ error: 'JWT secret is not configured' });
    }
    // Create payload and encode
    const payload = { userId: user._id };
    const cookieEncoded = jwt.encode(payload, JWT_SECRET);
    console.log("payload:", payload)
    console.log("cookieEncoded:", cookieEncoded)

    // Set cookie
    res.cookie('userId', cookieEncoded, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Logout route
router.post('/logout', (_, res) => {
  res.clearCookie('userId');
  res.json({ message: 'Logout successful' });
});

router.get('/users', anonymousUserMiddleware, async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/users', anonymousUserMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      ...(password && { password })
    });

    await user.save();
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

router.get('/users/userId', anonymousUserMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('email name');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.delete('/users/:id', anonymousUserMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;