const User = require('../models/userModel');

const requireAuth = (req, res, next) => {
    const userId = req.cookies.user_id;

    if (userId) {
        // If there is a user_id cookie set, you can proceed
        req.userId = userId;
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = requireAuth;