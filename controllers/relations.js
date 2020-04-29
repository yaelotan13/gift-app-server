const relationsModel = require('../models/relations');
const { productIdIsValid, CategoriesToEditAreValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const isProductValid = async id => await productIdIsValid(id);

const getCategoriesAllById = async (id) => await relationsModel.getCategoriesByProductId(id);

const deletMainCategories = async (categoriesIds) => {
    return await relationsModel.deleteMainCategories(categoriesIds);
};

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
};

const addCategories = async (id, categories) => {
    if (!CategoriesToEditAreValid(categories)) {
        return clientError.badReques;
    }

    console.log('in controller, add categories');
    console.log(categories);
    
    if (categories.sub_categories) {
        return await relationsModel.addCategoriesByProductId('sub_categories', id, categories.sub_categories.join(', ')) 
    }
    return await relationsModel.addCategoriesByProductId('main_categories', id, categories.main_categories.join(', '));
};

const deleteProductsFromRelations = async (productIds) => {
    return await relationsModel.deleteProducts(productIds);
};

module.exports = {
    isProductValid,
    getCategoriesAllById,
    deleteCategories,
    addCategories,
    deleteProductsFromRelations,
    deletMainCategories
};
