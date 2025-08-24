const mongoose = require('mongoose');
const LeaveRequestSchema = new mongoose.Schema({
  internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern' },
  date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  comment: { type: String }
});
module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);
