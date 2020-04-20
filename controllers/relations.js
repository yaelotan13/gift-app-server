const relationsModel = require('../models/relations');
const { productIdIsValid, CategoriesToEditAreValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const isProductValid = async id => await productIdIsValid(id);

const getCategoriesAllById = async (id) => await relationsModel.getCategoriesByProductId(id);

const deleteCategories = async (id, categories) => {
    if (!CategoriesToEditAreValid(categories)) {
        return clientError.badReques;
    }
    console.log('in controller');
    console.log(categories);
    console.log(categories.main_categories);
    return await categories.sub_categories ? 
        relationsModel.deleteCategoriesByProductId('sub_categories', id, categories.sub_categories) 
        : 
        relationsModel.deleteCategoriesByProductId('main_categories', id, categories.main_categories);
}

const addCategories = async (id, categories) => {
    if (!CategoriesToEditAreValid(categories)) {
        return clientError.badReques;
    }

    console.log('in controller, add categories');
    console.log(categories);
    
    return await categories.sub_categories ? 
        relationsModel.addCategoriesByProductId('sub_categories', id, categories.sub_categories) 
        : 
        relationsModel.addCategoriesByProductId('main_categories', id, categories.main_categories);
}

module.exports = {
    isProductValid,
    getCategoriesAllById,
    deleteCategories,
    addCategories,
};
