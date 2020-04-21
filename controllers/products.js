const productModel = require('../models/products');
const { newProductIsValid, productIdIsValid } = require('./validate');
const { clientError, successful } = require('../util/statusCode');
const { newProductIsValid : updatedProductIsValid } = require('./validate');
const { deleteProducts } = require('./relations');

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

const deleteProduct = async (productId) => {
    const isValidId = await productIdIsValid(productId);
    console.log(`is valid ? ${isValidId}`);
    if (!isValidId) {
        console.log('NOT VALID');
        return clientError;
    }

    const deleteProductsRelationsStatus = await deleteProducts(productId);
    if (deleteProductsRelationsStatus !== successful.ok) {
        console.log('in not ok');
        console.log(deleteProductsRelationsStatus);
        return deleteProductsRelationsStatus;
    }

    return await productModel.deleteProduct(productId);
}
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
    updateProductInfo,
    deleteProduct
};
