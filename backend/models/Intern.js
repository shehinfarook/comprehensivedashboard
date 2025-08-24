const mongoose = require('mongoose');
const InternSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchCode: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String },
  passwordHash: { type: String },
  paymentHistory: [{ amount: Number, date: Date, dueDate: Date }],
  leaveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LeaveRequest' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  isActive: { type: Boolean, default: true },
  profilePic: { type: String }
});
module.exports = mongoose.model('Intern', InternSchema);
