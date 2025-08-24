const express = require('express');
const router = express.Router();

// Simple AI agentic chat (rule-based)
router.post('/', async (req, res) => {
  const { message } = req.body;
  let reply = 'Sorry, I did not understand.';
  if (message.includes('schedule')) reply = 'You can view your schedule in the dashboard.';
  if (message.includes('payment')) reply = 'Your payment history is available in the dashboard.';
  if (message.includes('leave')) reply = 'You can apply for leave using the leave form.';
  res.json({ reply });
});

module.exports = router;
