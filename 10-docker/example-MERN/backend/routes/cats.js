const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

// GET all cats
router.get('/', async (req, res) => {
  try {
    const cats = await Cat.find().sort({ createdAt: -1 });
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single cat
router.get('/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new cat
router.post('/', async (req, res) => {
  const cat = new Cat({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    breed: req.body.breed,
    description: req.body.description
  });

  try {
    const newCat = await cat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update cat
router.put('/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

    if (req.body.name) cat.name = req.body.name;
    if (req.body.imageUrl) cat.imageUrl = req.body.imageUrl;
    if (req.body.breed) cat.breed = req.body.breed;
    if (req.body.description !== undefined) cat.description = req.body.description;

    const updatedCat = await cat.save();
    res.json(updatedCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE cat
router.delete('/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'Cat not found' });
    }
    await cat.deleteOne();
    res.json({ message: 'Cat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
