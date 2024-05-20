// fortuneCategoryController.js

// Import the FortuneCategory model
const FortuneCategory = require('../models/fortuneCategoryModel');

// Controller functions

// GET all fortune categories
const getFortuneCategories = async (req, res) => {
    try {
        const categories = await FortuneCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET a single fortune category
const getFortuneCategory = async (req, res) => {
    try {
        const category = await FortuneCategory.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Fortune category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST a new fortune category
const createFortuneCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const category = await FortuneCategory.create({ category_name });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE a fortune category
const deleteFortuneCategory = async (req, res) => {
    try {
        const category = await FortuneCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Fortune category not found' });
        }
        res.status(200).json({ message: 'Fortune category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE a fortune category
const updateFortuneCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        const category = await FortuneCategory.findByIdAndUpdate(req.params.id, { category_name }, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Fortune category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

module.exports = {
    getFortuneCategories,
    getFortuneCategory,
    createFortuneCategory,
    deleteFortuneCategory,
    updateFortuneCategory
};
