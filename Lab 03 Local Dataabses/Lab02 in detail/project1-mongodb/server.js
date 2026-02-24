const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lab02_db';

app.use(bodyParser.json());
app.use(express.static('public'));

const studentSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  age:    { type: Number, required: true },
  course: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create student
app.post('/api/students', async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
