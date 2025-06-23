import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  title: String,
  date: String,
  notes: String,
  category: String,
  week: Number,
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
export default Milestone;
