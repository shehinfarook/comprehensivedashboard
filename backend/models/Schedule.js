const mongoose = require('mongoose');
const ScheduleSchema = new mongoose.Schema({
  batchCode: { type: String, required: true },
  week: { type: String },
  classes: [{ date: Date, time: String, subject: String }]
});
module.exports = mongoose.model('Schedule', ScheduleSchema);
