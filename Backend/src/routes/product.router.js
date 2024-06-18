var productRouter = require('express').Router();
const ProductController = require("../controllers/product.controller");
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");

productRouter.get('/', ProductController.ListAllProducts);
productRouter.get('/:id', ProductController.GetProductById);
productRouter.put('/:id', ProductController.UpdateProduct);
productRouter.post('/', ProductController.CreateProduct);

module.exports = productRouter;
