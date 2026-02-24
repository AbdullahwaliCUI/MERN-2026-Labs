/**
 * LOGGER MIDDLEWARE
 * Restaurant Analogy: The Host or Waiter recording the order.
 * This logs every request that comes into the server.
 */
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} request to ${url}`);
    
    // Always call next() to pass control to the next middleware/route handler
    next();
};

module.exports = logger;
