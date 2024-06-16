const asyncHandler = require('../utils/async-handle');
const AuthenService = require("../services/authen.service");
const ProductService = require("../services/product.service");

module.exports = {
    ListAllProducts: asyncHandler(async (req, res) => {
        const result = await ProductService.ListAllProducts(req);
        res.status(200).json(result);
    }),
};