const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'lab02_db'
});

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create student
app.post('/api/students', async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const [result] = await pool.query(
      'INSERT INTO students (name, age, course) VALUES (?, ?, ?)',
      [name, age, course]
    );
    res.status(201).json({ id: result.insertId, name, age, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const [result] = await pool.query(
      'UPDATE students SET name = ?, age = ?, course = ? WHERE id = ?',
      [name, age, course, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ id: req.params.id, name, age, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id     INT AUTO_INCREMENT PRIMARY KEY,
        name   VARCHAR(100) NOT NULL,
        age    INT NOT NULL,
        course VARCHAR(100) NOT NULL
      )
    `);
    console.log('Table ready');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('MySQL init error:', err.message);
    process.exit(1);
  }
}

init();
