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
  res.send("Student Budget backend is running.");
});

/* Transactions */

app.get("/api/transactions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC, id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { type, title, amount, category, date, paymentMethod, note } = req.body;

    if (!type || !title || !amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO transactions
      (type, title, amount, category, date, payment_method, note)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [type, title, amount, category, date, paymentMethod || null, note || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, amount, category, date, paymentMethod, note } = req.body;

    const result = await pool.query(
      `UPDATE transactions
       SET type = $1,
           title = $2,
           amount = $3,
           category = $4,
           date = $5,
           payment_method = $6,
           note = $7
       WHERE id = $8
       RETURNING *`,
      [type, title, amount, category, date, paymentMethod || null, note || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

/* Budgets */

app.get("/api/budgets", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM budgets ORDER BY category ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

app.post("/api/budgets", async (req, res) => {
  try {
    const { category, limit } = req.body;

    if (!category || !limit) {
      return res.status(400).json({ error: "Category and limit are required" });
    }

    const result = await pool.query(
      `INSERT INTO budgets (category, limit_amount)
       VALUES ($1, $2)
       ON CONFLICT (category)
       DO UPDATE SET limit_amount = EXCLUDED.limit_amount
       RETURNING *`,
      [category, limit]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save budget" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});