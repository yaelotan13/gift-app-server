const express = require('express');

const mainCategoriesController = require('../../../controllers/mainCategories');
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

module.exports = router;
