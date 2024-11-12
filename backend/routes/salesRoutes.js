const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController'); // Ensure path is correct
const auth = require('../middlewares/authMiddleware'); // Ensure path is correct if using authentication

// Route to get all sales
router.get('/', auth, salesController.getAllSales);

// Route to add a new sale
router.post('/', auth, salesController.createSale);

module.exports = router;
