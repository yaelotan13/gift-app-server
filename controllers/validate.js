const productModel = require('../models/products');

const newProductIsValid = product => product.name && product.store && product.price && product.image && product.link;

const newMainCategoryIsValid = maincategory => maincategory.name && maincategory.image;

const newSubCategoryIsValid = subCategory => subCategory.id && subCategory.name;

const productIdIsValid = async productId => {
    const numProducts = await productModel.getNumProducts();
    return numProducts.rows[0].max >= productId;
};

const deleteCategoriesFromRelationsIsValid = categories => categories.sub_categories || categories.main_categories;

module.exports = {
    newProductIsValid,
    newMainCategoryIsValid,
    newSubCategoryIsValid,
    productIdIsValid,
    deleteCategoriesFromRelationsIsValid
}