const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("Notes backend is running.");
});

app.get("/api/notes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});