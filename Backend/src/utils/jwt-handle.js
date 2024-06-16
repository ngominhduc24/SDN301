const jwt = require("jsonwebtoken");

function accessToken(payload) {
    const access_token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: '365d' })
    return access_token
}

function refreshToken(payload) {
    const access_token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: '365d' })
    return access_token
}

module.exports = {accessToken, refreshToken};