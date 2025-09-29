import express from "express";
import { getWhyChooseItems } from "../controllers/whyController.js";

const router = express.Router();

// ✅ GET all Why Choose Us items
// router.get("/", async (req, res) => {
//   try {
//     const data = await WhyChoose.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
router.get("/", getWhyChooseItems); 


export default router;
