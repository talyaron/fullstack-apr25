import { connectToDatabase, closeDatabase } from './database';
import { Fighter } from './types';

async function seedFighters() {
    try {
        const db = await connectToDatabase();
        const fightersCollection = db.collection<Fighter>('fighters');

       const legendaryFighters: Omit<Fighter, 'id'>[] = [
        {  name: "Saenchai",
                age: 43,
                weight_class: "Lightweight",
                wins: 319,
                losses: 52,
                draws: 3,
                knockouts: 45,
                gym: "Yokkao Training Center",
                fight_style: "Muay Femur",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Rodtang Jitmuangnon",
                age: 26,
                weight_class: "Flyweight",
                wins: 269,
                losses: 42,
                draws: 10,
                knockouts: 76,
                gym: "Jitmuangnon Gym",
                fight_style: "Muay Mat",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Superbon Banchamek",
                age: 33,
                weight_class: "Featherweight",
                wins: 122,
                losses: 34,
                draws: 0,
                knockouts: 35,
                gym: "Banchamek Gym",
                fight_style: "Muay Femur",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Petchboonchu FA Group",
                age: 45,
                weight_class: "Lightweight",
                wins: 278,
                losses: 28,
                draws: 2,
                knockouts: 90,
                gym: "FA Group",
                fight_style: "Muay Khao",
                nationality: "Thailand",
                active: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Namsaknoi Yudthagarngamtorn",
                age: 47,
                weight_class: "Lightweight",
                wins: 285,
                losses: 20,
                draws: 2,
                knockouts: 45,
                gym: "Sor Sumalee",
                fight_style: "Muay Femur",
                nationality: "Thailand",
                active: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Tawanchai PK Saenchai",
                age: 24,
                weight_class: "Featherweight",
                wins: 141,
                losses: 33,
                draws: 2,
                knockouts: 38,
                gym: "PK Saenchai Muaythaigym",
                fight_style: "Muay Tae",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Sittichai Sitsongpeenong",
                age: 32,
                weight_class: "Lightweight",
                wins: 126,
                losses: 32,
                draws: 5,
                knockouts: 43,
                gym: "Sitsongpeenong",
                fight_style: "Muay Tae",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Nong-O Gaiyanghadao",
                age: 37,
                weight_class: "Bantamweight",
                wins: 262,
                losses: 58,
                draws: 1,
                knockouts: 45,
                gym: "Evolve MMA",
                fight_style: "Muay Khao",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Prajanchai PK Saenchai",
                age: 28,
                weight_class: "Strawweight",
                wins: 358,
                losses: 49,
                draws: 2,
                knockouts: 204,
                gym: "PK Saenchai Muaythaigym",
                fight_style: "Muay Mat",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: "Superlek Kiatmoo9",
                age: 28,
                weight_class: "Flyweight",
                wins: 142,
                losses: 30,
                draws: 0,
                knockouts: 42,
                gym: "Kiatmoo9",
                fight_style: "Muay Tae",
                nationality: "Thailand",
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ];

        const result = await fightersCollection.insertMany(legendaryFighters);
       console.log(`🎉 Successfully added ${result.insertedCount} legendary fighters!`);
       console.log('Fighter IDs:', Object.values(result.insertedIds)); 


    } catch (error) {
        console.error('❌ Error seeding fighters:', error);
    } finally {
        await closeDatabase();
    }
}

// Run the seed function
seedFighters();
