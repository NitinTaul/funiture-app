// backend/routes/collectionsRoutes.js
import express from "express";
import { getNewCollections } from "../controllers/collectionsController.js";

const router = express.Router();

// ✅ GET /api/collections - latest 4-6 products
router.get("/", getNewCollections);

export default router;
