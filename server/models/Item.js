const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  description: { type: String, default: "" }, 
  category: { type: String, default: "" }
});

module.exports = mongoose.model("Item", itemSchema);
