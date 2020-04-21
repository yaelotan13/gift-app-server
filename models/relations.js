const db = require('../util/db')();
const { successful, serverError, clientError } = require('../util/statusCode');

const getDbVariables = (type, categories) => {
    const tableName = type;
    const prefix = type === 'sub_categories' ? 'sub' : 'main';
    const joinedCategories = "'" + categories.join("','") + "'";

    return [tableName, prefix, joinedCategories];
}

const getCategoriesByProductId = async (productId) => {
    const status = serverError.internalServerError;
    try {
        const mainCategories = await db.query(`SELECT * FROM main_categories WHERE main_category_id IN (SELECT main_category_id FROM relations WHERE (product_id=${productId}));`);
        const subCategories = await db.query(`SELECT * FROM sub_categories WHERE sub_category_id IN (SELECT sub_category_id FROM relations WHERE (product_id=${productId}));`);
        const categoriesCombined = {
            main: [...mainCategories.rows],
            sub: [...subCategories.rows],
        };
        return categoriesCombined;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const deleteCategoriesByProductId = async (type, productId, categories) => {
    const status = serverError.internalServerError;
    const [tableName, prefix, joinedCategories] = getDbVariables(type, categories);
    console.log('in model');
    console.log(`DELETE FROM relations WHERE product_id=${productId} AND ${prefix}_category_id IN (SELECT (${prefix}_category_id) FROM ${tableName} WHERE ${prefix}_category_name IN (${joinedCategories}))`)
    try {
        const result = await db.query(`DELETE FROM relations WHERE product_id=${productId} AND ${prefix}_category_id IN (SELECT (${prefix}_category_id) FROM ${tableName} WHERE ${prefix}_category_name IN (${joinedCategories}))`);
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(error);
    }

    return status;
}

const addCategoriesByProductId = async (type, productId, categories) => {
    const status = serverError.internalServerError;
    const prefix = type === 'sub_categories' ? 'sub' : 'main';
    console.log('in model');
    console.log(`INSERT INTO relations (product_id, ${prefix}_category_id) VALUES (${productId}, unnest(array[${categories.join(',')}]));`)
    try {
        const result = await db.query(`INSERT INTO relations (product_id, ${prefix}_category_id) VALUES (${productId}, unnest(array[${categories.join(',')}]));`);
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(error);
    }

    return status;
}

const deleteProducts = async (productId) => {
    console.log('in relations model');
    const status = serverError.internalServerError;

    try {
        const result = await db.query(`DELETE FROM relations WHERE product_id=${productId}`);
        console.log(result);
        return result.rowCount >= 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(error);
    }

    return status;
};

module.exports = {
    getCategoriesByProductId,
    deleteCategoriesByProductId,
    addCategoriesByProductId,
    deleteProducts
};