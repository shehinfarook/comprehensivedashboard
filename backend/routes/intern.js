const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Intern = require('../models/Intern');
const LeaveRequest = require('../models/LeaveRequest');
const Notification = require('../models/Notification');
const Schedule = require('../models/Schedule');

// Upload profile picture
router.post('/upload-profile-pic', upload.single('file'), async (req, res) => {
  const { internId } = req.body;
  if (!req.file || !internId) return res.status(400).json({ error: 'File and internId required.' });
  // For demo, use local file path as URL
  const url = `/uploads/${req.file.filename}`;
  await Intern.findByIdAndUpdate(internId, { profilePic: url });
  res.json({ url });
});

// Get intern dashboard data
router.get('/dashboard/:id', async (req, res) => {
  const intern = await Intern.findById(req.params.id)
    .populate('leaveRequests notifications schedule');
  if (!intern) return res.status(404).json({ error: 'Intern not found' });
  res.json(intern);
});

// Apply for leave
router.post('/leave', async (req, res) => {
  const { internId, date, reason } = req.body;
  const leave = new LeaveRequest({ internId, date, reason });
  await leave.save();
  await Intern.findByIdAndUpdate(internId, { $push: { leaveRequests: leave._id } });
  res.json({ message: 'Leave request submitted.' });
});

module.exports = router;
