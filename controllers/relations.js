const relationsModel = require('../models/relations');
const { productIdIsValie } = require('./validate');
const { clientError } = require('../util/statusCode');

const getCategoriesAllById = async (id) => {
    if (!productIdIsValie(id)) {
        return clientError.badReques;
    }

    return await relationsModel.getCategoriesByProductId(id);
};

module.exports = {
    getCategoriesAllById
};
