// routes/roomRoutes.js
import express from "express";
import { getRoomTypes } from "../controllers/roomTypeController.js";

const router = express.Router();
router.get("/", getRoomTypes);



export default router;
