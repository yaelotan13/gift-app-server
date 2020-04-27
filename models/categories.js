const db = require('../util/db')();
const { successful, serverError, clientError } = require('../util/statusCode');

const addMainCategory = async (category) => {
    const { name, image } = category;
    let status = serverError.internalServerError;

    try {
        const result = await db.query(`INSERT INTO main_categories (main_category_name, main_category_image) VALUES ('${name}', '${image}')`);
        status = result.rowCount === 1 ? successful.created : serverError.internalServerError;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const addSubCategory = async (category) => {
    const { id, name } = category;
    let status = serverError.internalServerError;

    try {
        const result = await db.query(`INSERT INTO sub_categories (main_category_id, sub_category_name) VALUES (${id}, '${name}')`);
        status = result.rowCount === 1 ? successful.created : serverError.internalServerError;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllMainCategories = async () => {
    const status = serverError.internalServerError;

    try {
        const result = await db.query('SELECT * FROM main_categories');
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllSubCategories = async () => {
    const status = serverError.internalServerError;

    try {
        const result = await db.query('SELECT * FROM sub_categories');
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getNumMainCategories = async () => {
    let numProducts = 0;

    try {
        numProducts = await db.query('SELECT MAX(main_category_id) FROM main_categories');
    } catch (error) {
        console.log(error);
    }

    return numProducts;
};

const deleteMainCategories = async (categoriesIds) => {
    console.log('now in deleteMainCategories');
    const status = serverError.internalServerError;
    
    try {
        let result = await db.query(`DELETE FROM main_categories WHERE main_category_id = ANY(array[${categoriesIds}])`)
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log('now the ERROR IS HERE!!!!!');
        console.log(`DELETE FROM main_categories WHERE main_category_id = ANY(array[${categoriesIds}]);`);
        console.log(error);
    }

    return status;
};

const deleteMainCategoriesFromSubCategories = async (categoriesIds) => {
    const status = serverError.internalServerError;
    console.log('in model deleteMainCategoriesFromSubCategories');
    console.log(categoriesIds);
    try {
        console.log(`DELETE FROM sub_categories WHERE main_category_id = ANY(array[${categoriesIds}]);`);
        let result = await db.query(`DELETE FROM sub_categories WHERE main_category_id = ANY(array[${categoriesIds}]);`)
        console.log('result is:');
        console.log(result);
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const removeSubCategorisFromMainCategory = async (mainCategory, categoriesToRemove) => {
    const status = serverError.internalServerError;

    try {
        let result = await db.query(`DELETE FROM sub_categories WHERE main_category_id=${mainCategory} AND sub_category_name=ANY(array[${categoriesToRemove}]);`)
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(`DELETE FROM sub_categories WHERE main_category_id=${mainCategory} AND sub_category_name = ANY(array[${categoriesToRemove}]);`)
        console.log(error);
    }

    return status;
};

const addSubCategorisFromMainCategory = async (mainCategory, categoriesToAdd) => {
    let status = serverError.internalServerError;

    try {
        let result = await db.query(`INSERT INTO sub_categories (main_category_id, sub_category_name) VALUES (${mainCategory}, unnest(array[${categoriesToAdd}]))`);
        status = result.rowCount === categoriesToAdd.length ? successful.created : serverError.internalServerError;
    } catch (error) {
        console.log(error);
    }

    return status;
};

module.exports = {
    addMainCategory,
    addSubCategory,
    getAllMainCategories,
    getAllSubCategories,
    getNumMainCategories,
    deleteMainCategories,
    deleteMainCategoriesFromSubCategories,
    addSubCategorisFromMainCategory,
    removeSubCategorisFromMainCategory
}