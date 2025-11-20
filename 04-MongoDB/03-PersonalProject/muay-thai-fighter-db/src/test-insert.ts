import { connectToDatabase, closeDatabase } from './database';
import { Fighter } from './types';
async function addOneFighter() {
    try {
        // Connect to database
        const db = await connectToDatabase();
        
        // Get the fighters collection
        const fightersCollection = db.collection<Fighter>('fighters');
        
        // Create one fighter
        const newFighter: Fighter = {
            name: "Buakaw Banchamek",
            age: 41,
            weight_class: "Welterweight",
            wins: 239,
            losses: 24,
            draws: 12,
            knockouts: 71,
            gym: "Banchamek Gym",
            fight_style: "Muay Tae",
            nationality: "Thailand",
            active: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        
        // Insert the fighter into database
        const result = await fightersCollection.insertOne(newFighter);
        
        console.log('🎉 Fighter added successfully!');
        console.log('Fighter ID:', result.insertedId);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Always close the connection
        await closeDatabase();
    }
}

// Run the function
addOneFighter();