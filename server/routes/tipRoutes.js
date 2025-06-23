import express from "express";
import { getTipsByCategory, addTip } from "../controllers/tipController.js";

const router = express.Router();

router.get("/:category", getTipsByCategory);
router.post("/", addTip);

export default router;
