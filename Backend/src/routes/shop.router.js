const bodyParser = require('body-parser');
const express = require('express');
const ShopController = require('../controllers/shop.controller');

const shopRouter = express.Router();
shopRouter.use(bodyParser.json());

shopRouter.post('/', ShopController.create);
shopRouter.get('/', ShopController.getAll);
shopRouter.get('/:id', ShopController.getById);
shopRouter.put('/:id', ShopController.update);

shopRouter.post('/:shopId/product', ShopController.createProduct);
shopRouter.get('/:shopId/product', ShopController.getProductByShopId);
shopRouter.get('/:shopId/product/:id', ShopController.getProductById);
shopRouter.put('/:shopId/product/:id', ShopController.updateProductById);

module.exports = shopRouter;