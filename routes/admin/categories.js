const express = require('express');

const mainCategoriesRoutes = require('./categories/main');
const subCategoriesRoutes = require('./categories/sub');
const relationsController = require('../../controllers/relations');
const router = express.Router();

router.use('/main', mainCategoriesRoutes);
router.use('/sub', subCategoriesRoutes);

router.get('/', async (req, res) => {
    const result = await relationsController.getCategoriesAllById(req.query.id);
    result instanceof Object ? res.send(result) : res.sendStatus(result);  
});

module.exports = router;
