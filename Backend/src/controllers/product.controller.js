const asyncHandler = require("../utils/async-handle");
const AuthenService = require("../services/authen.service");
const ProductService = require("../services/product.service");

module.exports = {
  ListAllProducts: asyncHandler(async (req, res) => {
    const result = await ProductService.listAllProducts(req);
    res.status(200).json(result);
  }),

  GetProductById: asyncHandler(async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }),

  UpdateProduct: asyncHandler(async (req, res, next) => {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }),

  CreateProduct: asyncHandler(async (req, res, next) => {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }),

  ImportProductsFromExcel: asyncHandler(async (req, res, next) => {
    try {
      const fileBuffer = req.file.buffer;
      if (!fileBuffer) {
        return res
          .status(400)
          .json({ error: "No file uploaded or file is invalid" });
      }
      const products = await ProductService.importProductsFromExcel(fileBuffer);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),

  GetDataFromImportFile: asyncHandler(async (req, res, next) => {
    try {
      const fileBuffer = req.file.buffer;
      if (!fileBuffer) {
        return res
          .status(400)
          .json({ error: "No file uploaded or file is invalid" });
      }
      const products = await ProductService.getDataFromImportFile(fileBuffer);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
};
