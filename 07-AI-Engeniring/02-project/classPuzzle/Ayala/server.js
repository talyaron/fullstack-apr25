const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from current directory
app.use(express.static(__dirname));

// Initialize OpenAI
// NOTE: Make sure OPENAI_API_KEY is allowed in verify .env or passed directly
// If .env is gitignored, the user must create it manually.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/guess', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are playing an image guessing game. Identify the main subject or object in the image. Be specific but concise."
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What is the main subject in this image? Reply with ONLY the object/subject name (1-4 words), no punctuation or explanation." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": image,
                                "detail": "auto"
                            },
                        },
                    ],
                },
            ],
            max_tokens: 30,
            temperature: 0,
        });

        const guess = response.choices[0].message.content.trim();
        console.log("OpenAI Guess:", guess);

        res.json({ guess });

    } catch (error) {
        console.error("Error calling OpenAI:", error);
        res.status(500).json({ error: 'Failed to get guess from AI' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
