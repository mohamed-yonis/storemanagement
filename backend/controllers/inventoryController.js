// backend/controllers/inventoryController.js
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

exports.addInventory = async (req, res) => {
    const { product_id, quantity_added } = req.body;

    try {
        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const inventory = new Inventory({ product_id, quantity_added });
        await inventory.save();

        // Update product stock quantity
        product.stock_quantity += quantity_added;
        await product.save();

        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('product_id');
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
