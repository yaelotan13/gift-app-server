const express = require('express');

const mainCategoriesController = require('../../../controllers/mainCategories');
const { categorisIdsAreValid, categoryIsValid } = require('../../../controllers/validate');
const { clientError } = require('../../../util/statusCode');
const { uploadS3 } = require('../../../util/s3-uploader');

const router = express.Router();

router.post('/', uploadS3.single('image'), async (req, res) => {
    const status = await mainCategoriesController.addMainCategory({ ...req.body, image: req.file.location });
    res.status(status).send(`main category ${req.body.name} added!`);
});

router.get('/', async (req, res, next) => {
    if (req.params.id) {
        const result = await mainCategoriesController.getAllCategories(req.query);
        Array.isArray(result)? res.send(result) : res.sendStatus(result);
    } else {
        next();
    }
});

router.get('/', async (req, res) => {
    console.log('get all main categories');
    const result = await mainCategoriesController.getAllCategories(req.query);
    Array.isArray(result)? res.send(result) : res.sendStatus(result);
});

router.use('/', async (req, res, next) => {
    console.log('validating...');
    if (req.body.main_categories) {
        if (categorisIdsAreValid(req.body.main_categories)) {
            res.categories = req.body.main_categories;
            next();
        } else {
            res.sendStatus(clientError.badReques);
        }
    } else {
        // handle case we update only one category
    }
});

router.delete('/', async (req, res) => {
    console.log('got to delete main categories');
    console.log(res.categories);
    const status = await mainCategoriesController.deleteMainCategories(res.categories);
    res.status(status).send(`main category ${res.categories} was deleted`);
});

module.exports = router;
