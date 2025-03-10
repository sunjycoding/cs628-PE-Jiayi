const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipe-finder';

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('recipe-finder');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// RECIPE ROUTES

// Get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await db.collection('recipes').find({}).toArray();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await db.collection('recipes').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const { name, ingredients, instructions, cookingTime } = req.body;

        if (!name || !ingredients || !instructions || !cookingTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await db.collection('recipes').insertOne({
            name,
            ingredients,
            instructions,
            cookingTime: Number(cookingTime),
            createdAt: new Date()
        });

        res.status(201).json({
            _id: result.insertedId,
            name,
            ingredients,
            instructions,
            cookingTime
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a recipe
app.put('/api/recipes/:id', async (req, res) => {
    try {
        const { name, ingredients, instructions, cookingTime } = req.body;

        if (!name || !ingredients || !instructions || !cookingTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await db.collection('recipes').updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name,
                    ingredients,
                    instructions,
                    cookingTime: Number(cookingTime),
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({
            _id: req.params.id,
            name,
            ingredients,
            instructions,
            cookingTime
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const result = await db.collection('recipes').deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});