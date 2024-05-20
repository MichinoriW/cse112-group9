const express = require('express');
const {
    createFortuneMsg,
    getFortuneMsgs,
    getFortuneMsg,
    deleteFortuneMsg,
    updateFortuneMsg,
} = require('../controllers/fortuneMsgController');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// // require auth for all fortune message routes
// router.use(requireAuth);

// GET all fortune messages
router.get('/', getFortuneMsgs);

// GET a single fortune message
router.get('/:id', getFortuneMsg);

// POST a new fortune message
router.post('/', createFortuneMsg);

// DELETE a fortune message
router.delete('/:id', deleteFortuneMsg);

// UPDATE a fortune message
router.patch('/:id', updateFortuneMsg);

module.exports = router;
