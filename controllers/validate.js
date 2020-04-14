const productModel = require('../models/products');

const newProductIsValid = product => product.name && product.store && product.price && product.image && product.link;

const newMainCategoryIsValid = maincategory => maincategory.name && maincategory.image;

const newSubCategoryIsValid = subCategory => subCategory.id && subCategory.name;

const productIdIsValie = async productId => {
    const numProducts = await productModel.getNumProducts();
    return numProducts >= productId;
}

module.exports = {
    newProductIsValid,
    newMainCategoryIsValid,
    newSubCategoryIsValid,
    productIdIsValie
}