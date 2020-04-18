const express = require('express');

const relationsController = require('../../controllers/relations');
const { clientError } = require('../../util/statusCode');

const router = express.Router();

router.use('/', async (req, res, next) => {
    console.log('in check id');
    const isProductValid = await relationsController.isProductValid(req.query.product_id);
    isProductValid ? next() : res.sendStatus(clientError.badReques);
});

router.get('/', async (req, res) => {
    const result = await relationsController.getCategoriesAllById(req.query.product_id);
    result instanceof Object ? res.send(result) : res.sendStatus(result);  
});

router.delete('/', async (req, res) => {
    console.log('in delete');
    console.log(req.body);

    const status = await relationsController.deleteCategories(req.query.product_id, req.body);
    res.sendStatus(status);
});

router.post('/', async(req, res) => {
    console.log('in add categories');
    console.log(req.query.product_id);
    console.log(req.body);
    const status = await relationsController.addCategories(req.query.product_id, req.body);
    res.sendStatus(status);
})

module.exports = router;