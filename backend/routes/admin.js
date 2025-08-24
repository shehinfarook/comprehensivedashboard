const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern');
const LeaveRequest = require('../models/LeaveRequest');
const Notification = require('../models/Notification');
const Schedule = require('../models/Schedule');
const { parseAndInsertInterns } = require('../utils/parseInternsPDF');

// Add student manually
router.post('/add-student', async (req, res) => {
  const { name, batchCode } = req.body;
  console.log('Add student request:', { name, batchCode });
  if (!name || !batchCode) {
    console.log('Missing name or batchCode');
    return res.status(400).json({ error: 'Name and batch code required.' });
  }
  try {
    const result = await Intern.updateOne(
      { name },
      { name, batchCode },
      { upsert: true }
    );
    console.log('MongoDB update result:', result);
    res.json({ message: 'Student added.' });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ error: 'Failed to add student.' });
  }
});

// Approve/reject leave with comment
router.post('/leave/:id', async (req, res) => {
  const { status, comment } = req.body;
  await LeaveRequest.findByIdAndUpdate(req.params.id, { status, comment });
  res.json({ message: 'Leave status and comment updated.' });
});

// Mark absent
router.post('/absent/:internId', async (req, res) => {
  await Intern.findByIdAndUpdate(req.params.internId, { isActive: false });
  res.json({ message: 'Intern marked absent.' });
});

// Post notification
router.post('/notification', async (req, res) => {
  const { message, type, target } = req.body;
  const notification = new Notification({ message, type, target });
  await notification.save();
  res.json({ message: 'Notification posted.' });
});

// Upload intern list PDF and parse
router.post('/upload-interns', async (req, res) => {
  // Assume file is uploaded and available as req.file.path
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  try {
    const result = await parseAndInsertInterns(req.file.path);
    res.json({ message: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse and insert interns.' });
  }
});

// Upload schedule PDF and parse
router.post('/upload-schedule', async (req, res) => {
  const dataBuffer = fs.readFileSync(req.file.path);
  const data = await pdfParse(dataBuffer);
  // Parse schedule from data.text
  // ...custom parsing logic...
  // Save to DB
  res.json({ message: 'Schedule uploaded.' });
});

// Get all leave requests
router.get('/leave-requests', async (req, res) => {
  try {
    const requests = await LeaveRequest.find({ status: { $in: ['pending', null] } }).populate('internId', 'name batchCode userId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leave requests.' });
  }
});

module.exports = router;
