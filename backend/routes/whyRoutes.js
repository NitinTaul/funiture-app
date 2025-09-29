import express from "express";
import WhyChoose from "../models/Why.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await WhyChoose.find();
  res.json(data);
});

export default router;
