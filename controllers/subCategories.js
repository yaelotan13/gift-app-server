const categoriesModel = require('../models/categories');
const { newSubCategoryIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const addSubCategory = async (category) => {
    console.log(`in add sub category, got: `);
    console.log(category);
    if (!newSubCategoryIsValid(category)) {
        return clientError.badReques;
    }

    return await categoriesModel.addSubCategory(category);
};

const getAllCategories = async () => {
    return await categoriesModel.getAllSubCategories();
};

const deleteMainCategoriesFromSubCategories = async (categoriesIds) => {
    console.log('in subcategories controller');
    return await categoriesModel.deleteMainCategoriesFromSubCategories(categoriesIds);
}

module.exports = {
    addSubCategory,
    getAllCategories,
    deleteMainCategoriesFromSubCategories
}
