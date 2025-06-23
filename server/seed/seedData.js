import mongoose from "mongoose";
import dotenv from "dotenv";
import Milestone from "../models/Milestone.js";
import Tip from "../models/Tip.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedMilestones = [
  {
    title: "Started prenatal vitamins",
    date: "2024-01-15",
    notes: "Doctor recommended folic acid supplements",
    category: "health",
    week: 4,
  },
  {
    title: "First ultrasound",
    date: "2024-02-10",
    notes: "Baby is healthy and developing well!",
    category: "medical",
    week: 8,
  },
];

const seedTips = [
  {
    milestoneType: "health",
    title: "Choose quality prenatal vitamins",
    content:
      "Look for vitamins with at least 400mcg of folic acid, iron, and DHA.",
    author: "Sarah M.",
    likes: 24,
    createdAt: "2024-01-10",
  },
  {
    milestoneType: "medical",
    title: "Prepare questions for your ultrasound",
    content:
      "Write down questions beforehand so you don't forget to ask during the appointment.",
    author: "Emily R.",
    likes: 18,
    createdAt: "2024-02-05",
  },
  {
    milestoneType: "health",
    title: "Take vitamins with food",
    content:
      "Taking prenatal vitamins with a meal can help reduce nausea and improve absorption.",
    author: "Dr. Johnson",
    likes: 32,
    createdAt: "2024-01-20",
  },
];

const seedDatabase = async () => {
  try {
    await Milestone.deleteMany();
    await Tip.deleteMany();

    const createdMilestones = await Milestone.insertMany(seedMilestones);
    const createdTips = await Tip.insertMany(seedTips);

    console.log("Seeded successfully!");
    console.log(
      `${createdMilestones.length} milestones, ${createdTips.length} tips`
    );
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
