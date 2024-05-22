// userController.js

// Import the User model
const User = require('../models/userModel');

// Controller functions

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET a single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST a new user
const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.create({ email, username, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// DELETE a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UPDATE a user
const updateUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { email, username, password }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = await User.login(email, password);

        // Set the user's ID in a cookie
        res.cookie('user_id', user._id.toString(), { httpOnly: true });

        res.status(200).json({ user_id: user._id.toString(), email: user.email, username: user.username });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);

        // Set the user's ID in a cookie
        res.cookie('user_id', user._id.toString(), { httpOnly: true });

        res.status(200).json({ user_id: user._id.toString(), email: user.email, username: user.username });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    signupUser
};
