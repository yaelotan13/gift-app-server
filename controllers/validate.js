const newProductIsValid = product => product.name && product.store && product.price && product.image && product.link;

module.exports = {
    newProductIsValid,
}