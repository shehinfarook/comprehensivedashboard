const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ['important', 'class', 'payment'], default: 'important' },
  target: { type: String, default: 'all' }, // all, intern, batch
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notification', NotificationSchema);
