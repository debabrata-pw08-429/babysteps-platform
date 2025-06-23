import Milestone from "../models/Milestone.js";

export const getMilestones = async (req, res) => {
  const milestones = await Milestone.find().sort({ date: 1 });
  res.json(milestones);
};

export const addMilestone = async (req, res) => {
  const { title, date, notes, category, week } = req.body;
  const newMilestone = new Milestone({ title, date, notes, category, week });
  await newMilestone.save();
  res.json(newMilestone);
};

export const getRecommendations = (req, res) => {
  const week = parseInt(req.params.week);
  let recommendations = [];

  if (week <= 4) {
    recommendations = [
      "Start taking prenatal vitamins with folic acid",
      "Schedule your first prenatal appointment",
      "Avoid alcohol and smoking",
      "Begin tracking your symptoms",
    ];
  } else if (week <= 12) {
    recommendations = [
      "Continue prenatal vitamins",
      "Stay hydrated and eat small, frequent meals",
      "Get plenty of rest",
      "Consider telling close family and friends",
    ];
  } else if (week <= 28) {
    recommendations = [
      "Schedule your anatomy scan",
      "Start thinking about baby names",
      "Consider prenatal classes",
      "Begin baby-proofing research",
    ];
  } else {
    recommendations = [
      "Pack your hospital bag",
      "Prepare the nursery",
      "Practice breathing exercises",
      "Have a birth plan discussion with your doctor",
    ];
  }

  res.json({ week, recommendations });
};
