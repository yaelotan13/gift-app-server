const productModel = require('../models/products');
const { newProductIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');

const addProduct = async (product) => {
    console.log('validating...');
    console.log(product);
    if (!newProductIsValid(product)) {
        console.log('is NOT valid');
        return clientError.badReques;
    }
    console.log('sending the product to the model');
    console.log(product);
    return await productModel.addProduct(product);
};

const getAllById = async (id) => {
    return await productModel.getAllById(id);
};

const getAllByStore = async (store) => {
    return await productModel.getAllByStore(store);
};

const getAllByPrice = async (value, filter) => {
    const sign = filter === 'gt' ? '>=' : '<=';
    return await productModel.getAllByPrice(value, sign);
};

const getAllProducts = async (params) => {
    return await productModel.getAllProducts();
};

module.exports = {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice,
    getAllById
};
