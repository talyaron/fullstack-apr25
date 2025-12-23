import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Recipe } from './models/Recipe';

dotenv.config();

const seedDatabase = async () => {
  try {
    const forceReseed = process.argv.includes('--force');

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/savta-rina';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data if --force flag is used
    if (forceReseed) {
      console.log('Force flag detected - clearing existing data...');
      await Recipe.deleteMany({});
      await User.deleteMany({});
      console.log('Existing data cleared');
    }

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@rina.com' });
    if (!existingAdmin) {
      const admin = new User({
        email: 'admin@rina.com',
        fullName: 'System Admin',
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
          title: "Grandma's Chocolate Cake",
          category: 'Desserts',
          ingredients: ['2 cups flour', '1 cup sugar', '3/4 cup cocoa powder', '2 eggs', '1 cup oil', '1 cup boiling water'],
          instructions: ['Mix the dry ingredients', 'Add eggs and oil', 'Add boiling water and mix well', 'Bake at 180°C for 35 minutes'],
          prepTime: 50,
          difficulty: 2,
          imageUrl: ''
        },
        {
          title: 'Chicken Soup with Dumplings',
          category: 'Soups',
          ingredients: ['1 whole chicken', '3 carrots', '2 onions', 'celery', 'parsley', 'salt and pepper'],
          instructions: ['Cook the chicken in water', 'Add vegetables', 'Simmer for 2 hours', 'Add dumplings'],
          prepTime: 150,
          difficulty: 3,
          imageUrl: ''
        },
        {
          title: 'Homemade Hummus',
          category: 'Appetizers',
          ingredients: ['2 cups dried chickpeas', 'tahini', 'lemon', 'garlic', 'cumin', 'olive oil'],
          instructions: ['Soak chickpeas overnight', 'Cook until soft', 'Blend with other ingredients', 'Serve with olive oil'],
          prepTime: 30,
          difficulty: 2,
          imageUrl: ''
        },
        {
          title: 'Crispy Schnitzel',
          category: 'Main Courses',
          ingredients: ['chicken breast', 'flour', 'eggs', 'breadcrumbs', 'oil for frying'],
          instructions: ['Cut breast into slices', 'Coat in flour, egg, and breadcrumbs', 'Fry in hot oil'],
          prepTime: 30,
          difficulty: 1,
          imageUrl: ''
        },
        {
          title: 'Fresh Garden Salad',
          category: 'Salads',
          ingredients: ['tomatoes', 'cucumbers', 'onion', 'parsley', 'lemon', 'olive oil'],
          instructions: ['Dice vegetables into small cubes', 'Mix together', 'Season with lemon and oil'],
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
