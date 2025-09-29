import express from "express";
import NewCollection from "../models/NewCollection.js";

const router = express.Router();

// ✅ GET all new collection products (latest first)
router.get("/", async (req, res) => {
  try {
    const products = await NewCollection.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching collections:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
