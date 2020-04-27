const productModel = require('../models/products');
const categoriesModel = require('../models/categories');

const newProductIsValid = product => product.name && product.store && product.price && product.link;

const newMainCategoryIsValid = maincategory => maincategory.name && maincategory.image;

const newSubCategoryIsValid = subCategory => subCategory.id && subCategory.name;

const productIdIsValid = async productId => {
    const numProducts = await productModel.getNumProducts();
    return numProducts.rows[0].max >= productId;
};

const categorisIdsAreValid = async categoriesIds => {
    const numCategories = await categoriesModel.getNumMainCategories();
    categoriesIds.forEach(categoryId => {
        if (categoryId > numCategories || categoryId < 0) {
            return false;
        }
    });

    return true;
};

const categoryIsValid = async categoryId => {

};

const mainCategoryIsValid = async (mainCategoryId) => {
    const numMainCategories = await categoriesModel.getNumMainCategories();
    return mainCategoryId <= numMainCategories;
};

const CategoriesToEditAreValid = categories => categories.sub_categories || categories.main_categories;

module.exports = {
    newProductIsValid,
    newMainCategoryIsValid,
    newSubCategoryIsValid,
    productIdIsValid,
    CategoriesToEditAreValid,
    categorisIdsAreValid,
    categoryIsValid,
    mainCategoryIsValid
}