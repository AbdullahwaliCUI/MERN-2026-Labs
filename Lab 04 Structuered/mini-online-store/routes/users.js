/**
 * USER ROUTES
 * Restaurant Analogy: The Staff-Only entrance.
 * Demonstrates Router-level middleware and Route Parameters.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

/**
 * WHY USE express.Router()?
 * Referring to "Clean & Scalable Code": 
 * As your app grows, putting 100+ routes in app.js becomes a nightmare. 
 * Routers allow us to group related routes into small, manageable files.
 */

// Apply 'auth' middleware ONLY to these user routes
// This means every request to /users must go through the "Bouncer" first.
router.use(auth);

// GET /users/:id (Route Parameter)
router.get('/:id', userController.getUserById);

// POST /users (Request Body / Data Submission)
router.post('/', userController.createUser);

module.exports = router;
