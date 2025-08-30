// backend/routes/projects.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Get projects by user_id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      "SELECT * FROM projects WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;