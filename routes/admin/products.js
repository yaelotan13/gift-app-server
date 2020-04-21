const express = require('express');

const productController = require('../../controllers/products');
const upload = require('../../util/imageStorage');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('got to post products');
    console.log(req.file);
    const newProduct = req.body;
    console.log(newProduct);
    const newProductId = await productController.addProduct(newProduct);
    //const status = await productController.addProduct({...newProduct, image: req.file.originalname});
    res.send({
        productId: newProductId
    });
});

router.put('/', async (req, res) => {
    console.log('in edit post info');
    console.log(req.body);
    if (req.body.updated_product) {
        const status = await productController.updateProductInfo(req.query.product_id, req.body.updated_product);
        res.sendStatus(status);
    }
});

router.delete('/', async (req, res) => {
    console.log('in delete prodcuts');
    const status = await productController.deleteProduct(req.body.product_id);
    console.log('got response');
    console.log(status);
    res.sendStatus(status);
});

router.get('/', async (req, res, next) => {
    console.log('trying get gifts by Id');
    console.log(req.query);
    if (req.query['product_id']) {
        const result = await productController.getAllById(req.query.product_id);
        console.log(result);
        result instanceof Object ? res.send(result) : res.sendStatus(result);
    } else {
        next();
    }
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