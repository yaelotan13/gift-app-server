const {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice
 } = require('./products');
 const { newProductIsValid } = require('./validate');

module.export = validate = {
    newProductIsValid
};

module.export = productController = {
    addProduct,
    getAllProducts,
    getAllByStore,
    getAllByPrice
};