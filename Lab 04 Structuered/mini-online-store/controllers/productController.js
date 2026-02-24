/**
 * PRODUCT CONTROLLER
 * Restaurant Analogy: The Chef preparing the meal.
 * Controllers contain the business logic - the actual work being done.
 */

// Dummy data array
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Smartphone", price: 699 },
    { id: 3, name: "Headphones", price: 150 }
];

const getAllProducts = (req, res) => {
    res.status(200).json({
        success: true,
        data: products
    });
};

module.exports = {
    getAllProducts
};
