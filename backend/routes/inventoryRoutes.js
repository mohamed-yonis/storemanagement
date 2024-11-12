// backend/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, inventoryController.addInventory);
router.get('/', auth, inventoryController.viewInventory);

module.exports = router;
