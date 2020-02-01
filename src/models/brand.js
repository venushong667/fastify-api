const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandname: String
});

module.exports = mongoose.model("Brand", brandSchema);
