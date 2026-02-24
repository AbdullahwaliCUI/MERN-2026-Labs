const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // serve static HTML, CSS, JS files

// Database
const db = new sqlite3.Database("database.db");

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT
  )
`);

// --------------------
// CRUD Routes
// --------------------

// Create User
app.post("/users", (req, res) => {
  const { name, phone } = req.body;
  db.run(
    "INSERT INTO users (name, phone) VALUES (?, ?)",
    [name, phone],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phone });
    }
  );
});

// Read all Users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update User
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  db.run(
    "UPDATE users SET name = ?, phone = ? WHERE id = ?",
    [name, phone, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated" });
    }
  );
});

// Delete User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

// Serve Add User page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
