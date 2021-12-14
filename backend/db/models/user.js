const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  verified: { type: Boolean, default: false, },
  resetLink: { type: String, default: '' }
});

module.exports = mongoose.model("User", user);