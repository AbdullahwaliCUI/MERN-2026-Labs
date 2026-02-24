const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


// ================= CREATE =================
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body;

  const sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";

  db.query(sql, [name, email, phone], (err) => {
    if (err) return res.send(err);
    res.send("User Added");
  });
});


// ================= READ =================
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


// ================= UPDATE =================
app.put('/users/:id', (req, res) => {
  const { name, email, phone } = req.body;
  const id = req.params.id;

  const sql = "UPDATE users SET name=?, email=?, phone=? WHERE id=?";

  db.query(sql, [name, email, phone, id], (err) => {
    if (err) return res.send(err);
    res.send("User Updated");
  });
});


// ================= DELETE =================
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.send(err);
    res.send("User Deleted");
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
