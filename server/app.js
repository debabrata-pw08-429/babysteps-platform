import express from "express";
import cors from "cors";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "BabySteps API is running" });
});

app.use("/api/milestones", milestoneRoutes);
app.use("/api/tips", tipRoutes);

export default app;
