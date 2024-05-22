// Import the FortuneMsg model
const FortuneMsg = require('../models/fortuneMsgModel');

// Controller functions

// GET all fortune messages for a specific user
const getFortuneMsgs = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const fortunes = await FortuneMsg.find({ user_id });
        res.status(200).json(fortunes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET a single fortune message for a specific user
const getFortuneMsg = async (req, res) => {
    try {
        const { user_id, id } = req.params;
        const fortune = await FortuneMsg.findOne({ user_id, _id: id });
        if (!fortune) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json(fortune);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST a new fortune message for a specific user
const createFortuneMsg = async (req, res) => {
    try {
        const { user_id, category_id, description, date } = req.body;
        const fortune = await FortuneMsg.create({ user_id, category_id, description, date });
        res.status(201).json(fortune);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE a fortune message for a specific user
const deleteFortuneMsg = async (req, res) => {
    try {
        const { user_id, id } = req.params;
        const fortune = await FortuneMsg.findOneAndDelete({ user_id, _id: id });
        if (!fortune) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json({ message: 'Fortune message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE a fortune message for a specific user
const updateFortuneMsg = async (req, res) => {
    try {
        const { user_id, id } = req.params;
        const { category_id, description, date } = req.body;
        const fortune = await FortuneMsg.findOneAndUpdate(
            { user_id, _id: id },
            { category_id, description, date },
            { new: true }
        );
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
