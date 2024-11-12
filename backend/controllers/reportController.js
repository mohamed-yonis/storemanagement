// backend/controllers/reportController.js
const Sale = require('../models/Sale');
const Inventory = require('../models/Inventory');

exports.generateSalesReport = async (req, res) => {
    try {
        const sales = await Sale.find().populate('product_id');
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
