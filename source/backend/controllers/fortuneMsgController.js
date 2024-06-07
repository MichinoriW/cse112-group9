// Import the FortuneMsg model
const FortuneMsg = require('../models/fortuneMsgModel');
const { deleteMany } = require('../models/userModel');

// Controller functions


/**
 * * @summary Used to retrieve fortune(s) for a specific user
 * 
 * * @example
 * // to get the specific fortune 78910 for user 123456
 *  GET /api/fortuneMsg/123456?fortune_id=78910
 * 
 * * @example
 * // to get all the fortunes for user 123456
 * GET /api/fortuneMsg/123456
 */
const getFortuneMsgs = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { fortune_id } = req.query;
        let fortunes;
        if (fortune_id){
            fortunes = await FortuneMsg.find({ user_id: user_id, id: fortune_id});
        }
        else{
            fortunes = await FortuneMsg.find({ user_id: user_id});
        }
        console.log(user_id);
        console.log(fortunes);
        res.status(200).json(fortunes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @deprecated This function is deprecated and has been replaced by getFortuneMsgs called with /:user_id?fortune_id={fortune id}
 */
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
        console.log(error);
        if(error.isValidationError){
            res.status(400).json({ error: 'Invalid data' });
        }
        else{
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// DELETE a fortune message for a specific user
const deleteFortuneMsg = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { fortune_id } = req.query;
        if (!fortune_id) {
            await FortuneMsg.deleteMany({ user_id : user_id })
            return res.status(200).json({ message: 'All Fortune messages deleted successfully' });
        }
        const fortune = await FortuneMsg.deleteOne({ user_id : user_id , _id: fortune_id });
        if (fortune.deletedCount === 0) {
            return res.status(404).json({ error: 'Fortune message not found' });
        }
        res.status(200).json({ message: 'Fortune message deleted successfully' });
    } catch (error) {
        console.log(error);
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
