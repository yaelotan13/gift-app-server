const { decryptPassword } = require('../util/token');
const { clientError, successful } = require('../util/statusCode');

const logIn = (password) => {
    if (decryptPassword(password) === process.env.ADMIN_PASSWORD) {
        return successful.ok;
    }

    return clientError.unauthorized;
};

module.exports = {
    logIn
};