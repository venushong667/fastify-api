// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
  title: String,
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  price: String,
  age: Number,
  services: {
    type: Map,
    of: String
  }
});
// Duplicate the ID field.
carSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
carSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Car", carSchema);
