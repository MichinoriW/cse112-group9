const express = require('express');
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    login
} = require('../controllers/userController');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all user routes
// router.use(requireAuth);

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a user
router.delete('/:id', deleteUser);

// UPDATE a user
router.patch('/:id', updateUser);

// login
router.post('/login', login);

module.exports = router;
