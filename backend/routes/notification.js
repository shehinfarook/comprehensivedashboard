const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for intern
router.get('/:target', async (req, res) => {
  const notifications = await Notification.find({ target: req.params.target });
  res.json(notifications);
});

module.exports = router;
