const db = require('../util/db')();
const { successful, serverError} = require('../util/statusCode');

const addProduct = async (product) => {
    console.log('in model');
    console.log(product);
    const { name, store, price, image, link } = product;
    let status = serverError.internalServerError;
    
    try {
        const result = await db.query(`INSERT INTO products (product_name, store, price, product_image, link) VALUES ('${name}', '${store}', ${price}, '${image}', '${link}')`);
        status = result.rowCount === 1 ? successful.created : serverError.internalServerError;
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

module.exports = {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice
};
