import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Recipe } from './models/Recipe';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/savta-rina';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@rina.com' });
    if (!existingAdmin) {
      const admin = new User({
        email: 'admin@rina.com',
        fullName: 'מנהל המערכת',
        password: 'IAmAdmin19296157#',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@rina.com');
    } else {
      console.log('Admin user already exists');
    }

    // Create sample recipes
    const existingRecipes = await Recipe.countDocuments();
    if (existingRecipes === 0) {
      const sampleRecipes = [
        {
          title: 'עוגת שוקולד של סבתא',
          category: 'קינוחים',
          ingredients: ['2 כוסות קמח', '1 כוס סוכר', '3/4 כוס קקאו', '2 ביצים', '1 כוס שמן', '1 כוס מים רותחים'],
          instructions: ['מערבבים את החומרים היבשים', 'מוסיפים ביצים ושמן', 'מוסיפים מים רותחים ומערבבים', 'אופים ב-180 מעלות 35 דקות'],
          prepTime: 50,
          difficulty: 2,
          imageUrl: ''
        },
        {
          title: 'מרק עוף עם קניידלך',
          category: 'מרקים',
          ingredients: ['עוף שלם', '3 גזרים', '2 בצלים', 'סלרי', 'פטרוזיליה', 'מלח ופלפל'],
          instructions: ['מבשלים את העוף במים', 'מוסיפים ירקות', 'מבשלים 2 שעות', 'מוסיפים קניידלך'],
          prepTime: 150,
          difficulty: 3,
          imageUrl: ''
        },
        {
          title: 'חומוס ביתי',
          category: 'מנות ראשונות',
          ingredients: ['2 כוסות חומוס יבש', 'טחינה', 'לימון', 'שום', 'כמון', 'שמן זית'],
          instructions: ['שורים חומוס לילה', 'מבשלים עד ריכוך', 'טוחנים עם שאר החומרים', 'מגישים עם שמן זית'],
          prepTime: 30,
          difficulty: 2,
          imageUrl: ''
        },
        {
          title: 'שניצל פריך',
          category: 'מנות עיקריות',
          ingredients: ['חזה עוף', 'קמח', 'ביצים', 'פירורי לחם', 'שמן לטיגון'],
          instructions: ['חותכים חזה לפרוסות', 'מטבלים בקמח, ביצה ופירורי לחם', 'מטגנים בשמן חם'],
          prepTime: 30,
          difficulty: 1,
          imageUrl: ''
        },
        {
          title: 'סלט ישראלי',
          category: 'סלטים',
          ingredients: ['עגבניות', 'מלפפונים', 'בצל', 'פטרוזיליה', 'לימון', 'שמן זית'],
          instructions: ['חותכים ירקות לקוביות קטנות', 'מערבבים', 'מתבלים בלימון ושמן'],
          prepTime: 15,
          difficulty: 1,
          imageUrl: ''
        }
      ];

      await Recipe.insertMany(sampleRecipes);
      console.log('Sample recipes created');
    } else {
      console.log('Recipes already exist');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
