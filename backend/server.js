import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example API for reports
app.get("/api/reports", (req, res) => {
  res.json([
    { id: 1, name: "Bridge Inspection", project: "Highway 21", date: "2025-08-01", status: "Reviewed" },
    { id: 2, name: "Pipeline Audit", project: "City Water Supply", date: "2025-08-10", status: "Pending" },
    { id: 3, name: "Electrical Safety Check", project: "Downtown Revitalization", date: "2025-08-15", status: "Flagged" }
  ]);
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
