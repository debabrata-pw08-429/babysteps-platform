import Tip from "../models/Tip.js";

export const getTipsByCategory = async (req, res) => {
  const { category } = req.params;
  const tips = await Tip.find({ milestoneType: category });
  res.json(tips);
};

export const addTip = async (req, res) => {
  const { milestoneType, title, content, author } = req.body;
  const newTip = new Tip({ milestoneType, title, content, author });
  await newTip.save();
  res.json(newTip);
};
