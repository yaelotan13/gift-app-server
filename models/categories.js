const db = require('../util/db')();
const { successful, serverError } = require('../util/statusCode');

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

const getMainCategoriesById = async (id) => {

};

const getSubCategoriesById = async (id) => {

};

module.exports = {
    addMainCategory,
    addSubCategory,
    getAllMainCategories,
    getAllSubCategories
}