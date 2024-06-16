var productRouter = require('express').Router();
const ProductController = require("../controllers/product.controller");
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");

productRouter.get('/', ProductController.ListAllProducts);

module.exports = productRouter;
