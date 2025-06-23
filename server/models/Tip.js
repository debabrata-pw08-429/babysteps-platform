import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  milestoneType: String,
  title: String,
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  createdAt: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

const Tip = mongoose.model("Tip", tipSchema);
export default Tip;
