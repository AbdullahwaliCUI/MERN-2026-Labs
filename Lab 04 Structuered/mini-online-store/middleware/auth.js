/**
 * AUTH MIDDLEWARE
 * Restaurant Analogy: The Bouncer checking ID at the door or a VIP pass.
 * This simulates checking if a user is "authorized" before accessing certain routes.
 */
const auth = (req, res, next) => {
    // For this lab, we simulate a token check using a query parameter
    // In a real app, this would check 'Authorization' headers (e.g., Bearer Token)
    const token = req.query.token;

    if (token === 'admin123') {
        console.log("Auth: Access Granted");
        next(); // Pass control to the next function
    } else {
        console.log("Auth: Access Denied");
        res.status(401).json({
            error: "Unauthorized",
            message: "You need a valid token (Try adding ?token=admin123 to the URL)"
        });
    }
};

module.exports = auth;
