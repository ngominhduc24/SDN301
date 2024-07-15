const bodyParser = require('body-parser');
const express = require('express');
const Notification = require('../models/notification');

const router = express.Router();
router.use(bodyParser.json());

router.get('/:shopId', async (req, res) => {
    const { shopId } = req.params;
    try {
        const notifications = await Notification.find({ shopId: shopId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'An error occurred while fetching notifications.' });
    }
});

module.exports = router;
