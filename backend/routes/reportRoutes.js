// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware');

router.get('/sales', auth, reportController.generateSalesReport);

module.exports = router;
