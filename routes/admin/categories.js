const express = require('express');

const mainCategoriesRoutes = require('./categories/main');
const subCategoriesRoutes = require('./categories/sub');
const relationsRoutes = require('./relations');

const router = express.Router();

router.use('/main', mainCategoriesRoutes);
router.use('/sub', subCategoriesRoutes);
router.use('/', relationsRoutes);

module.exports = router;
