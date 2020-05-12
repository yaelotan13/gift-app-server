const express = require('express');

const productController = require('../../controllers/products');
const { uploadS3 } = require('../../util/s3-uploader');

const router = express.Router();

router.post('/', uploadS3.single('image'), async (req, res) => {
    console.log('got to post new product');
    console.log(req.file.location);
    const newProduct = req.body;
    console.log(newProduct);
    const newProductId = await productController.addProduct({ ...newProduct, image: req.file.location });
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
    console.log(req.body.products_id)
    const status = await productController.deleteProducts(req.body.products_id);
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
        Array.isArray(result) ? res.send(result) : res.sendStatus(result);
    } else {
        next();
    }
});

router.get('/', async (req, res) => {
    console.log('get all gifts');
    const result = await productController.getAllProducts(req.query);
    console.log('route got the result');
    console.log(result);
    Array.isArray(result) ? res.send(result) : res.sendStatus(result);
});

module.exports = router;