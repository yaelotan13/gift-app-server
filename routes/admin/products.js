const express = require('express');

const productController = require('../../controllers/products');
const upload = require('../../util/imageStorage');

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file);
    const newProduct = req.body;
    console.log(newProduct);
    const status = await productController.addProduct({...newProduct, image: req.file.originalname});
    console.log(status);
    res.status(status).send(newProduct);
});

router.get('/', async (req, res, next) => {
    console.log('trying get gifts by store');
    console.log(req.query);
    if (req.query['store']) {
        const result = await productController.getAllByStore(req.query.store);
        console.log(result);
        Array.isArray(result)? res.send(result) : res.sendStatus(result);
    } else {
        next();
    }
});

router.get('/', async (req, res, next) => {
    console.log('trying get gifts by price');
    console.log(req.query);
    if (req.query['price']) {
        const result = await productController.getAllByPrice(req.query.price, req.query.filter);
        Array.isArray(result)? res.send(result) : res.sendStatus(result);
    } else {
        next();
    }
});

router.get('/', async (req, res) => {
    console.log('get all gifts');
    console.log(req.query);
    const result = await productController.getAllProducts(req.query);
    Array.isArray(result)? res.send(result) : res.sendStatus(result);
});

module.exports = router;