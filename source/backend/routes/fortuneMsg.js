const express = require('express');
const {
    createFortuneMsg,
    getFortuneMsgs,
    getFortuneMsg,
    deleteFortuneMsg,
    updateFortuneMsg,
} = require('../controllers/fortuneMsgController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// // require auth for all fortune message routes
// router.use(requireAuth);

// GET all fortune messages
router.get('/:user_id', getFortuneMsgs);

// GET a single fortune message
router.get('/:user_id/:id', getFortuneMsg);

// POST a new fortune message
router.post('/', createFortuneMsg);

// DELETE a fortune message
router.delete('/:user_id', deleteFortuneMsg);


// UPDATE a fortune message
router.patch('/user_id/:id', updateFortuneMsg);

module.exports = router;
