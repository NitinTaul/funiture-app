// backend/routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// 📦 Get latest 6 products (for New Collections)
router.get("/latest", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ❤️ Like a product
router.post("/:id/like", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to like product" });
  }
});

module.exports = router;
