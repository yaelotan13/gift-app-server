const express = require('express');

const relationsController = require('../../controllers/relations');
const { clientError } = require('../../util/statusCode');

const router = express.Router();

router.use('/', async (req, res, next) => {
    console.log('in check id');
    const isProductValid = await relationsController.isProductValid(req.query.id);
    isProductValid ? next() : res.sendStatus(clientError.badReques);
});

router.get('/', async (req, res) => {
    const result = await relationsController.getCategoriesAllById(req.query.id);
    result instanceof Object ? res.send(result) : res.sendStatus(result);  
});

router.delete('/', async (req, res) => {
    console.log('in delete main');
    const status = await relationsController.deleteCategories(req.query.id, req.body);
    res.sendStatus(status);
})

module.exports = router;