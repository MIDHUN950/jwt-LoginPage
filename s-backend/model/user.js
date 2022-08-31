const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  uid: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  secret : { type: String}
});

module.exports = mongoose.model("user", userSchema);