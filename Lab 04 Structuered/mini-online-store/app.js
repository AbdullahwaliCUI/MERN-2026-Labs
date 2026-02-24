/**
 * MAIN APP ENTRY POINT
 * Restaurant Analogy: The Restaurant Manager.
 * Orchestrates everything: sets up the server, applies rules, and directs traffic.
 */
const express = require('express');
const app = express();
const PORT = 3000;

// Import Middleware
const logger = require('./middleware/logger');

// Import Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

// --- GLOBAL MIDDLEWARE ---
// Use the built-in JSON parser (so we can read req.body)
app.use(express.json());

// Apply 'logger' globally (The host greets every guest)
app.use(logger);

// --- ROUTES MOUNTING ---
// Mount product routes at /products
app.use('/products', productRoutes);

// Mount user routes at /users
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Mini Online Store API!</h1><p>Use /products or /users?token=admin123 to see more.</p>');
});

// --- ERROR HANDLING ---
/**
 * 404 Not Found Middleware
 * If no route matches the request, this middleware at the end catches it.
 */
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found",
        message: "The resource you requested does not exist."
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`👨‍🏫 Lab Ready: Test endpoints in your browser or Postman.`);
});
