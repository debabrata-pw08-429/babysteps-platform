import express from "express";
import {
  getMilestones,
  addMilestone,
  getRecommendations,
} from "../controllers/milestoneController.js";

const router = express.Router();

router.get("/", getMilestones);
router.post("/", addMilestone);
router.get("/recommendations/:week", getRecommendations);

export default router;
