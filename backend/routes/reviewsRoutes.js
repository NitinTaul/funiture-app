//not Fully working
import express from "express";
import Review from "../models/Review.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Review.find();
  res.json(data);
});

export default router;
