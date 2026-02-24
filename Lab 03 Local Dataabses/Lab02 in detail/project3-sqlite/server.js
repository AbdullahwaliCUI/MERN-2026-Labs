const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = new Database('students.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name   TEXT NOT NULL,
    age    INTEGER NOT NULL,
    course TEXT NOT NULL
  )
`);

// GET all students
app.get('/api/students', (req, res) => {
  try {
    const students = db.prepare('SELECT * FROM students').all();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create student
app.post('/api/students', (req, res) => {
  try {
    const { name, age, course } = req.body;
    const result = db.prepare(
      'INSERT INTO students (name, age, course) VALUES (?, ?, ?)'
    ).run(name, age, course);
    res.status(201).json({ id: result.lastInsertRowid, name, age, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
app.put('/api/students/:id', (req, res) => {
  try {
    const { name, age, course } = req.body;
    const result = db.prepare(
      'UPDATE students SET name = ?, age = ?, course = ? WHERE id = ?'
    ).run(name, age, course, req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ id: req.params.id, name, age, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
