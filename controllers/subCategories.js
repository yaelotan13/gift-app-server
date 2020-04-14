const relationsModel = require('../models/relations');
const { newSubCategoryIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const addSubCategory = async (category) => {
    console.log(`in add sub category, got: `);
    console.log(category);
    if (!newSubCategoryIsValid(category)) {
        return clientError.badReques;
    }

    return await relationsModel.addSubCategory(category);
};

const getAllCategories = async () => {
    return await categoryModel.getAllSubCategories();
};

module.exports = {
    addSubCategory,
    getAllCategories
}
