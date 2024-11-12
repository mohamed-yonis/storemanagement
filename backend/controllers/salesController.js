const Sale = require('../models/Sale');
const Product = require('../models/Product');
const mongoose = require('mongoose'); // Ensure you import mongoose

exports.createSale = async (req, res) => {
    const { product_id, quantity, total_price } = req.body;

    // Validate fields
    if (!product_id || !quantity || !total_price) {
        return res.status(400).json({ message: 'All fields (product_id, quantity, total_price) are required' });
    }

    // Check if product_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).json({ message: 'Invalid product_id' });
    }

    try {
        // Check if the product exists
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if quantity is a valid number and total_price matches
        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number' });
        }

        const expectedTotalPrice = product.price * quantity;
        if (total_price !== expectedTotalPrice) {
            return res.status(400).json({ message: `Total price should be ${expectedTotalPrice}` });
        }

        // Create the sale record
        const sale = new Sale({ product_id, quantity, total_price });
        await sale.save();

        // Update product stock if needed
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        product.stock -= quantity;
        await product.save();

        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
