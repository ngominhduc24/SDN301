const bodyParser = require('body-parser');
const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');

const warehouseRouter = express.Router();
warehouseRouter.use(bodyParser.json());

warehouseRouter.post('/', WarehouseController.create);
warehouseRouter.get('/', WarehouseController.getAll);
warehouseRouter.get('/:id', WarehouseController.getById);
warehouseRouter.put('/:id', WarehouseController.update);

warehouseRouter.post('/:warehouseId/product', WarehouseController.createProduct);
warehouseRouter.get('/:warehouseId/product', WarehouseController.getProductByWarehouseId);
warehouseRouter.get('/:warehouseId/product/:id', WarehouseController.getProductById);
warehouseRouter.put('/:warehouseId/product/:id', WarehouseController.updateProductById);

module.exports = warehouseRouter;
