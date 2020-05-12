const express = require('express');

const subCategoriesController = require('../../../controllers/subCategories');
const router = express.Router();

router.post('/', async (req, res, next) => {
  if (req.query.mainCategoryId) {
    next();
  } else {
    const status = await subCategoriesController.addSubCategory(req.body);
    res.status(status).send(`sub category ${req.body.name} added!`);
  }
});

router.post('/', async (req, res) => {
  console.log('POST to sub categories by main category id');
  console.log(req.body);
  console.log(req.query.mainCategoryId)
  const status = await subCategoriesController.editSubCategoris(req.query.mainCategoryId, req.body);
  res.sendStatus(status);
})

router.get('/', async (req, res) => {
  console.log('get all sub categories');
  console.log(req.query);
  const result = await subCategoriesController.getAllCategories(req.query);
  Array.isArray(result)? res.send(result) : res.sendStatus(result);
});


module.exports = router;