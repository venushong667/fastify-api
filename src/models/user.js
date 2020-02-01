const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String
});

module.exports = mongoose.model("User", userSchema);
