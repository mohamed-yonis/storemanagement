// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    stock_quantity: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
