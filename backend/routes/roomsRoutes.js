import express from "express";
import Room from "../models/Room.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Room.find();
  res.json(data);
});

export default router;
