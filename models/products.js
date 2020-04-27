const db = require('../util/db')();
const { successful, serverError} = require('../util/statusCode');

const getProductId = async () => {
    const retValue = null;

    try {
        const result = await db.query('SELECT MAX(product_id) FROM products');
        return result.rows[0].max;
    } catch (error) {
        console.log(error);
    }   

    return retValue;
};

const addProduct = async (product) => {
    console.log('in addProduct model');
    console.log(product);
    const { name, store, price, image, link } = product;
    let status = serverError.internalServerError;
    
    try {
        const result = await db.query(`INSERT INTO products (product_name, store, price, product_image, link) VALUES ('${name}', '${store}', ${price}, '${image}', '${link}')`);
        const productId = await getProductId();
        console.log('got product id');
        console.log(productId);
        status = result.rowCount === 1 ? productId : serverError.internalServerError;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const deleteProducts = async (productIds) => {
    const status = serverError.internalServerError;

    try {
        const result = await db.query(`DELETE FROM products WHERE product_id = ANY(array[${productIds}]);`);
        return result.rowCount > 0 ? successful.ok : clientError.notFound;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllById = async (id)=> {
    const status = serverError.internalServerError;
    console.log(`SELECT * FROM products WHERE product_id='${id}'`);
    try {
        const result = await db.query(`SELECT * FROM products WHERE product_id='${id}'`);
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllByStore = async (store)=> {
    const status = serverError.internalServerError;
    console.log(`SELECT * FROM products WHERE store='${store}'`);
    try {
        const result = await db.query(`SELECT * FROM products WHERE store = '${store}'`);
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllByPrice = async (value, sign) => {
    const status = serverError.internalServerError;
    console.log(`SELECT * FROM products WHERE price${sign}${value}`);
    try {
        const result = await db.query(`SELECT * FROM products WHERE price${sign}${value}`);
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getAllProducts = async () => {
    const status = serverError.internalServerError;

    try {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    return status;
};

const getNumProducts = async () => {
    let numProducts = 0;

    try {
        numProducts = await db.query('SELECT MAX(product_id) FROM products');
    } catch (error) {
        console.log(error);
    }

    return numProducts;
};

const updateProductInfo = async (productId, updatedProduct) => {
    let status = serverError.internalServerError;
    const { name, store, price, link, image } = {...updatedProduct};
    console.log('in model');
    try {
        const result = await db.query(`UPDATE products SET product_name='${name}', price=${price}, store='${store}', link='${link}', product_image='${image}' WHERE product_id=${productId};`);
        console.log(result);
        status = result.rowCount === 1 ? successful.created : serverError.internalServerError;
    } catch (error) {
        console.log(error);
    }

    return status;
};

module.exports = {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice,
    getNumProducts,
    getAllById,
    updateProductInfo,
    deleteProducts
};
