const crypto = require('crypto');

function hashPassword(password) {
    const hash = crypto.createHash('sha256').update(password).digest('base64');
    return hash;
}

module.exports = hashPassword;