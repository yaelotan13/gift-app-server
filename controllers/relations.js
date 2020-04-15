const relationsModel = require('../models/relations');
const { productIdIsValid, deleteCategoriesFromRelationsIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const isProductValid = async id => await productIdIsValid(id);

const getCategoriesAllById = async (id) => await relationsModel.getCategoriesByProductId(id);


const deleteCategories = async (id, categories) => {
    if (!deleteCategoriesFromRelationsIsValid(categories)) {
        return clientError.badReques;
    }

    return await categories.sub_categories ? 
        relationsModel.deleteCategoriesByProductId('sub_categories', id, categories.sub_categories) 
        : 
        relationsModel.deleteCategoriesByProductId('main_categories', id, categories.main_categories);
}

module.exports = {
    isProductValid,
    getCategoriesAllById,
    deleteCategories
};
