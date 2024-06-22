const crypto = require('crypto');

function hashPassword(password) {
    const hash = crypto.createHash('sha256').update(password).digest('base64');
    return hash;
}

const hashChangePassword = (inputPassword, storedPassword) => {
    const hash = crypto.createHash('sha256').update(inputPassword).digest('base64');
    return storedPassword === hash;
};

module.exports = {hashPassword, hashChangePassword};