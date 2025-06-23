import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (in production, this would be a database)
let milestones = [
  {
    id: "1",
    title: "Started prenatal vitamins",
    date: "2024-01-15",
    notes: "Doctor recommended folic acid supplements",
    category: "health",
    week: 4,
  },
  {
    id: "2",
    title: "First ultrasound",
    date: "2024-02-10",
    notes: "Baby is healthy and developing well!",
    category: "medical",
    week: 8,
  },
];

let tips = [
  {
    id: "1",
    milestoneType: "health",
    title: "Choose quality prenatal vitamins",
    content:
      "Look for vitamins with at least 400mcg of folic acid, iron, and DHA.",
    author: "Sarah M.",
    likes: 24,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    milestoneType: "medical",
    title: "Prepare questions for your ultrasound",
    content:
      "Write down questions beforehand so you don't forget to ask during the appointment.",
    author: "Emily R.",
    likes: 18,
    createdAt: "2024-02-05",
  },
  {
    id: "3",
    milestoneType: "health",
    title: "Take vitamins with food",
    content:
      "Taking prenatal vitamins with a meal can help reduce nausea and improve absorption.",
    author: "Dr. Johnson",
    likes: 32,
    createdAt: "2024-01-20",
  },
];

// API Routes
app.get("/api/milestones", (req, res) => {
  res.json(milestones);
});

app.post("/api/milestones", (req, res) => {
  const { title, date, notes, category, week } = req.body;
  const newMilestone = {
    id: Date.now().toString(),
    title,
    date,
    notes,
    category,
    week: parseInt(week) || 0,
  };
  milestones.push(newMilestone);
  milestones.sort((a, b) => new Date(a.date) - new Date(b.date));
  res.json(newMilestone);
});

app.get("/api/tips/:category", (req, res) => {
  const { category } = req.params;
  const categoryTips = tips.filter((tip) => tip.milestoneType === category);
  res.json(categoryTips);
});

app.post("/api/tips", (req, res) => {
  const { milestoneType, title, content, author } = req.body;
  const newTip = {
    id: Date.now().toString(),
    milestoneType,
    title,
    content,
    author,
    likes: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  tips.push(newTip);
  res.json(newTip);
});

app.get("/api/recommendations/:week", (req, res) => {
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
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "BabySteps API is running" });
});

app.listen(PORT, () => {
  console.log(`BabySteps API server running on http://localhost:${PORT}`);
});
