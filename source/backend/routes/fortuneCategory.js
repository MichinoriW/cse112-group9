const express = require('express');
const {
    createFortuneCategory,
    getFortuneCategories,
    getFortuneCategory,
    deleteFortuneCategory,
    updateFortuneCategory,
} = require('../controllers/fortuneCategoryController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// // require auth for all fortune category routes
// router.use(requireAuth);

// GET all fortune categories
router.get('/', getFortuneCategories);

// GET a single fortune category
router.get('/:id', getFortuneCategory);

// POST a new fortune category
router.post('/', createFortuneCategory);

// DELETE a fortune category
router.delete('/:id', deleteFortuneCategory);

// UPDATE a fortune category
router.patch('/:id', updateFortuneCategory);

module.exports = router;
