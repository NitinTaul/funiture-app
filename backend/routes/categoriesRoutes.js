// routes/categoryRoutes.js
import express from "express";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();

// ✅ GET /api/categories
router.get("/", getCategories);

export default router;
