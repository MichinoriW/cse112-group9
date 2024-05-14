// fortuneMsgController.js

// Import the FortuneMsg model
const FortuneMsg = require('../models/fortuneMsgModel');

// Controller functions

// GET all fortune messages
const getFortuneMsgs = async (req, res) => {
    try {
        const fortunes = await FortuneMsg.find();
        res.status(200).json(fortunes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET a single fortune message
const getFortuneMsg = async (req, res) => {
    try {
        const fortune = await FortuneMsg.findById(req.params.id);
        if (!fortune) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json(fortune);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST a new fortune message
const createFortuneMsg = async (req, res) => {
    try {
        const { category_id, description, date } = req.body;
        const fortune = await FortuneMsg.create({ category_id, description, date });
        res.status(201).json(fortune);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE a fortune message
const deleteFortuneMsg = async (req, res) => {
    try {
        const fortune = await FortuneMsg.findByIdAndDelete(req.params.id);
        if (!fortune) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json({ message: 'Fortune message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE a fortune message
const updateFortuneMsg = async (req, res) => {
    try {
        const { category_id, description } = req.body;
        const fortune = await FortuneMsg.findByIdAndUpdate(req.params.id, { category_id, description, date}, { new: true });
        if (!fortune) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json(fortune);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

module.exports = {
    getFortuneMsgs,
    getFortuneMsg,
    createFortuneMsg,
    deleteFortuneMsg,
    updateFortuneMsg
};
