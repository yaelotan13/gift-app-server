const db = require('../util/db')();
const { successful, serverError} = require('../util/statusCode');

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

module.exports = {
    getCategoriesByProductId,
}