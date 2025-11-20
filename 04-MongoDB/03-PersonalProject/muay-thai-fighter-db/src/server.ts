import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { Fighter } from './types';
import { ObjectId } from 'mongodb';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve your HTML/CSS files

// Connect to database when server starts
connectToDatabase();

// ====== API ROUTES ======

// GET all fighters
app.get('/api/fighters', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const fighters = await db.collection<Fighter>('fighters')
            .find()
            .toArray();
        
        res.json(fighters);
    } catch (error) {
        console.error('Error fetching fighters:', error);
        res.status(500).json({ error: 'Failed to fetch fighters' });
    }
});

// GET single fighter by ID
app.get('/api/fighters/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const fighter = await db.collection<Fighter>('fighters')
            .findOne({ _id: new ObjectId(req.params.id) });
        
        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }
        
        res.json(fighter);
    } catch (error) {
        console.error('Error fetching fighter:', error);
        res.status(500).json({ error: 'Failed to fetch fighter' });
    }
});

// GET fighters with filters
app.get('/api/fighters/filter', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { weight_class, fight_style, active } = req.query;
        
        const filter: any = {};
        
        if (weight_class) filter.weight_class = weight_class;
        if (fight_style) filter.fight_style = fight_style;
        if (active !== undefined) filter.active = active === 'true';
        
        const fighters = await db.collection<Fighter>('fighters')
            .find(filter)
            .toArray();
        
        res.json(fighters);
    } catch (error) {
        console.error('Error filtering fighters:', error);
        res.status(500).json({ error: 'Failed to filter fighters' });
    }
});

// POST - Add new fighter
app.post('/api/fighters', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newFighter: Omit<Fighter, '_id'> = {
            ...req.body,
            created_at: new Date(),
            updated_at: new Date()
        };
        
        const result = await db.collection<Fighter>('fighters')
            .insertOne(newFighter as any);
        
        res.status(201).json({ 
            message: 'Fighter added successfully!', 
            id: result.insertedId 
        });
    } catch (error) {
        console.error('Error adding fighter:', error);
        res.status(500).json({ error: 'Failed to add fighter' });
    }
});

// PUT - Update fighter
app.put('/api/fighters/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const updates = {
            ...req.body,
            updated_at: new Date()
        };
        
        const result = await db.collection<Fighter>('fighters')
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: updates }
            );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Fighter not found' });
        }
        
        res.json({ message: 'Fighter updated successfully!' });
    } catch (error) {
        console.error('Error updating fighter:', error);
        res.status(500).json({ error: 'Failed to update fighter' });
    }
});

// DELETE fighter
app.delete('/api/fighters/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection<Fighter>('fighters')
            .deleteOne({ _id: new ObjectId(req.params.id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Fighter not found' });
        }
        
        res.json({ message: 'Fighter deleted successfully!' });
    } catch (error) {
        console.error('Error deleting fighter:', error);
        res.status(500).json({ error: 'Failed to delete fighter' });
    }
});

// GET statistics
app.get('/api/stats', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection<Fighter>('fighters');
        
        // Total fighters
        const totalFighters = await collection.countDocuments();
        
        // Active vs retired
        const activeFighters = await collection.countDocuments({ active: true });
        const retiredFighters = await collection.countDocuments({ active: false });
        
        // Average wins per weight class
        const avgWinsByWeightClass = await collection.aggregate([
            {
                $group: {
                    _id: '$weight_class',
                    avgWins: { $avg: '$wins' },
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        
        // Most common fight style
        const styleDistribution = await collection.aggregate([
            {
                $group: {
                    _id: '$fight_style',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]).toArray();
        
        // Top 10 fighters by win ratio
        const topFighters = await collection
            .find()
            .toArray()
            .then(fighters => 
                fighters
                    .map(f => ({
                        ...f,
                        winRatio: f.wins / (f.wins + f.losses + f.draws)
                    }))
                    .sort((a, b) => b.winRatio - a.winRatio)
                    .slice(0, 10)
            );
        
        res.json({
            totalFighters,
            activeFighters,
            retiredFighters,
            avgWinsByWeightClass,
            styleDistribution,
            topFighters
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});