import express from "express";
import { getWhyChooseItems } from "../controllers/whyController.js";

const router = express.Router();

router.get("/", getWhyChooseItems); 


export default router;
