const asyncHandler = require('../utils/async-handle');
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = process.env;

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(" ")[1];
        try {
            const user = jwt.verify(accessToken, PRIVATE_KEY);
            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json("Token is not valid");
        }
    } else {
        return res.status(401).json("You are not authenticated");
    }
});

// check user có phải admin không
const verifyTokenAdmin = asyncHandler(async (req, res, next) => {
    await verifyToken(req, res, () => {
        if (req.user.payload.role == 'ADMIN') {
            next();
        } else {
            return res.status(403).json("You are not an Admin");
        }
    });

});

// check user có phải admin không
const verifyTokenManager = asyncHandler(async (req, res, next) => {
    await verifyToken(req, res, () => {
        console.log(req.user.payload)
        if (req.user.payload.role == 'MANAGER') {
            next();
        } else {
            return res.status(403).json("You are not an Manager");
        }
    });

});

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenManager
};
