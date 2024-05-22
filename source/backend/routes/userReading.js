const express = require('express');
const {
    createUserReading,
    getUserReadings,
    getUserReading,
    deleteUserReading,
    updateUserReading,
} = require('../controllers/userReadingController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all user reading routes
// router.use(requireAuth);

// GET all user readings
router.get('/', getUserReadings);

// GET a single user reading
router.get('/:id', getUserReading);

// POST a new user reading
router.post('/', createUserReading);

// DELETE a user reading
router.delete('/:id', deleteUserReading);

// UPDATE a user reading
router.patch('/:id', updateUserReading);

module.exports = router;
