const CryptoJS = require("crypto-js");

const decryptPassword = (password) => {
    const bytes  = CryptoJS.AES.decrypt(password, process.env.ADMIN_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    decryptPassword
}