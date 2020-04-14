const express = require('express');

const subCategoriesController = require('../../../controllers/subCategories');

const router = express.Router();

router.post('/', async (req, res) => {
        const status = await subCategoriesController.addSubCategory(req.body);
        res.status(status).send(`sub category ${req.body.name} added!`);
});

router.get('/', async (req, res) => {
        console.log('get all main categories');
        console.log(req.query);
        const result = await subCategoriesController.getAllCategories(req.query);
        Array.isArray(result)? res.send(result) : res.sendStatus(result);
});

module.exports = router;