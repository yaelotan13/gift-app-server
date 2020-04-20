const productModel = require('../models/products');
const { newProductIsValid } = require('./validate');
const { clientError } = require('../util/statusCode');
const { newProductIsValid : updatedProductIsValid } = require('./validate');

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

const updateProductInfo = async (id, updatedProduct) => {
    if (!updatedProductIsValid(updatedProduct)) {
        console.log('NOT VALID');
        return clientError.badReques;
    }

    return await productModel.updateProductInfo(id, updatedProduct);
};

module.exports = {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice,
    getAllById,
    updateProductInfo
};
