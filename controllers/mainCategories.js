const categoryModel = require('../models/categories');
const { newMainCategoryIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const addMainCategory = async (category) => {
    if (!newMainCategoryIsValid(category)) {
        return clientError.badReques;
    }

    return await categoryModel.addMainCategory(category);
};

const getAllCategories = async () => {
    return await categoryModel.getAllMainCategories();
};

module.exports = {
    addMainCategory,
    getAllCategories
}