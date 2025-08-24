const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  passwordHash: { type: String, required: true }
});
module.exports = mongoose.model('Admin', AdminSchema);
