const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// CREATE
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

// READ
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
