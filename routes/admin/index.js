const express = require('express');

const adminProductRoutes = require('./products');
const adminCategoriesRoutes = require('./categories');

const router = express.Router();

router.use('/products', adminProductRoutes);
router.use('/categories', adminCategoriesRoutes);

module.exports = router;
