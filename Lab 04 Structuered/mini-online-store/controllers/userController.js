/**
 * USER CONTROLLER
 * Handles user-specific logic.
 */

const getUserById = (req, res) => {
    const userId = req.params.id; // Demonstrate Route Parameters

    // In a real app, you would fetch this from a database
    res.status(200).json({
        success: true,
        user: {
            id: userId,
            username: "JohnDoe",
            email: "john@example.com"
        }
    });
};

const createUser = (req, res) => {
    const userData = req.body; // Demonstrate receiving data via req.body

    console.log("Received User Data:", userData);

    res.status(201).json({
        message: "User created successfully",
        data: userData
    });
};

module.exports = {
    getUserById,
    createUser
};
