const asyncHandler = require('../utils/async-handle');
const AuthenService = require("../services/authen.service");
const ProductService = require("../services/product.service");

module.exports = {
    ListAllProducts: asyncHandler(async (req, res) => {
        const result = await ProductService.listAllProducts(req);
        res.status(200).json(result);
    }),

    GetProductById: asyncHandler(async (req, res) => {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.status(200).send(product);
          } catch (error) {
            console.log(error);
          }
    }),

    UpdateProduct: asyncHandler(async (req, res) => {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.status(200).send(product);
          } catch (error) {
            console.log(error);
          }
    }),

    CreateProduct: asyncHandler(async (req, res) => {
      try {
          const product = await ProductService.createProduct(req.body);
          res.status(200).send(product);
        } catch (error) {
          console.log(error);
        }
  }),
};