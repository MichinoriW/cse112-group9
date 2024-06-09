// userReadingController.js

// Import the UserReading model
const UserReading = require('../models/UserReadingModel.js');
const mongoose = require('mongoose');
// Controller functions

// GET all user readings
const getUserReadings = async (req, res) => {
    try {
        const readings = await UserReading.find();
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET a single user reading
const getUserReading = async (req, res) => {
    try {
        const reading = await UserReading.findById(req.params.id);
        if (!reading) {
            return res.status(404).json({ error: 'User reading not found' });
        }
        res.status(200).json(reading);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST a new user reading
const createUserReading = async (req, res) => {
    try {
        const { user_id, fortune_id, date } = req.body;
        const reading = await UserReading.create({ user_id, fortune_id, date });
        res.status(201).json(reading);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE a user reading
const deleteUserReading = async (req, res) => {
    try {
        const reading = await UserReading.findByIdAndDelete(req.params.id);
        if (!reading) {
            return res.status(404).json({ error: 'User reading not found' });
        }
        res.status(200).json({ message: 'User reading deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE a user reading
const updateUserReading = async (req, res) => {
    try {
        const { user_id, fortune_id, date } = req.body;
        const reading = await UserReading.findByIdAndUpdate(req.params.id, { user_id, fortune_id, date }, { new: true });
        if (!reading) {
            return res.status(404).json({ error: 'User reading not found' });
        }
        res.status(200).json(reading);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

module.exports = {
    getUserReadings,
    getUserReading,
    createUserReading,
    deleteUserReading,
    updateUserReading
};
