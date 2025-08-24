const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Forgot User ID
router.post('/forgot-userid', async (req, res) => {
  const { name, batchCode } = req.body;
  if (!name || !batchCode) return res.status(400).json({ error: 'Name and batch code required.' });
  const intern = await Intern.findOne({ name: new RegExp('^' + name.trim() + '$', 'i'), batchCode });
  if (!intern || !intern.userId) return res.status(404).json({ error: 'User ID not found. Contact admin.' });
  res.json({ userId: intern.userId });
});

// Signup: Intern matches name from DB, with profile pic and email
router.post('/signup', upload.single('profilePic'), async (req, res) => {
  const { name, password, email } = req.body;
  console.log('Signup attempt name:', name, 'email:', email);
  // Case-insensitive, trimmed match
  const intern = await Intern.findOne({ name: new RegExp('^' + name.trim() + '$', 'i') });
  console.log('Intern found:', intern);
  if (!intern) return res.status(400).json({ error: 'Name not found. Contact admin.' });
  if (intern.userId) return res.status(400).json({ error: 'User already exists.' });
  intern.userId = 'INT' + Math.floor(Math.random() * 1000000);
  intern.passwordHash = await bcrypt.hash(password, 10);
  intern.email = email;
  if (req.file) {
    intern.profilePic = `/uploads/${req.file.filename}`;
  }
  await intern.save();

  // Send userId to email
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    });
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your Intern Dashboard User ID',
      text: `Welcome! Your User ID is: ${intern.userId}`
    });
  } catch (e) {
    console.error('Email send failed:', e);
  }

  res.json({ message: 'Signup successful', userId: intern.userId });
});

// Login
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const intern = await Intern.findOne({ userId });
  if (!intern) return res.status(400).json({ error: 'User not found.' });
  const valid = await bcrypt.compare(password, intern.passwordHash);
  if (!valid) return res.status(400).json({ error: 'Invalid password.' });
  const token = jwt.sign({ id: intern._id, role: 'intern' }, 'secret');
  res.json({ token });
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  const { userId, newPassword } = req.body;
  const intern = await Intern.findOne({ userId });
  if (!intern) return res.status(400).json({ error: 'User not found.' });
  intern.passwordHash = await bcrypt.hash(newPassword, 10);
  await intern.save();
  res.json({ message: 'Password updated.' });
});

module.exports = router;
