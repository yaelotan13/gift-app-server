const categoriesModel = require('../models/categories');
const { newSubCategoryIsValid } = require('./validate');
const { clientError, successful, serverError } = require('../util/statusCode');
const relationsModel = require('../models/relations')

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

const editSubCategoris = async (mainCategoryId, subCategories) => {
    const { removedCategories, addedCategories } = subCategories;
    let removedCategoriesStatus = successful.ok;
    let addedCategoriesStatus = successful.ok;

    if (removedCategories.length > 0) {
        const parsedCateforiesToRemove = "'" + removedCategories.join("','") +"'";
        await relationsModel.deleteSubCategories(parsedCateforiesToRemove);
        removedCategoriesStatus = await categoriesModel.removeSubCategorisFromMainCategory(mainCategoryId, parsedCateforiesToRemove);
    }
    if (addedCategories.length > 0) {
        const parsedCateforiesToAdd = "'" + addedCategories.join("','") +"'";
        addedCategoriesStatus = await categoriesModel.addSubCategorisFromMainCategory(mainCategoryId, parsedCateforiesToAdd);
    }

    return removedCategoriesStatus === successful.ok && addedCategoriesStatus === successful.ok ? successful.ok : serverError.internalServerError;
};

module.exports = {
    addSubCategory,
    getAllCategories,
    deleteMainCategoriesFromSubCategories,
    editSubCategoris
}
