const categoryModel = require('../models/categories');
const { newMainCategoryIsValid } = require('./validate');
const { clientError, successful, serverError } = require('../util/statusCode');
const relationsController = require('./relations');
const { deleteMainCategoriesFromSubCategories } = require('./subCategories');

const addMainCategory = async (category) => {
    if (!newMainCategoryIsValid(category)) {
        return clientError.badReques;
    }

    return await categoryModel.addMainCategory(category);
};

const getAllCategories = async () => {
    return await categoryModel.getAllMainCategories();
};

const deleteMainCategories = async (categoriesIds) => {
    await relationsController.deletMainCategories(categoriesIds);
    await deleteMainCategoriesFromSubCategories(categoriesIds);
    return await categoryModel.deleteMainCategories(categoriesIds);
};

module.exports = {
    addMainCategory,
    getAllCategories,
    deleteMainCategories
}