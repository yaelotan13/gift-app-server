const express = require('express');

const adminProductRoutes = require('./products');
const adminCategoriesRoutes = require('./categories');
const adminUsersRoutes = require('./users');

const router = express.Router();

router.use('/products', adminProductRoutes);
router.use('/categories', adminCategoriesRoutes);
router.use('/users', adminUsersRoutes);

module.exports = router;
