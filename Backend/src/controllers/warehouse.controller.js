const warehouseService = require('../services/warehouse.service');

// Create a new warehouse
async function create(req, res, next) {
  try {
    const warehouse = {
      name: req.body.name,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      manager: req.body.manager
      };
    const newWarehouse = await warehouseService.create(warehouse);
    res.status(201).json(newWarehouse);
  } catch (error) {
    next(error);
  }
}

// Get all warehouses
async function getAll(req, res, next) {
  try {
    const warehouses = await warehouseService.getAll();
    res.status(200).send(warehouses);
  } catch (error) {
    next(error);
  }
}

// Get warehouse by ID
async function getById(req, res, next) {
  try {
    const warehouse = await warehouseService.getById(req.params.id);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }
    res.status(200).send(warehouse);
  } catch (error) {
    next(error);
  }
}

// Update warehouse by ID
async function update(req, res, next) {
  try {
    const updateWarehouse = {
      name: req.body.name,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      manager: req.body.manager,
      status: req.body.status,
      };
    const warehouse = await warehouseService.update(req.params.id, updateWarehouse);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }
    res.status(200).send(warehouse);
  } catch (error) {
    next(error);
  }
}

// Create a product for a specific warehouse
async function createProduct(req, res, next) {
  try {
    const warehouse = await warehouseService.createProduct(req.params.warehouseId, req.body);
    res.status(201).send(warehouse);
  } catch (error) {
    next(error);
  }
}

// Get all products for a specific warehouse
async function getProductByWarehouseId(req, res, next) {
  try {
    const products = await warehouseService.getProductByWarehouseId(req.params.warehouseId);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
}

// Get a specific product by its ID within a specific warehouse
async function getProductById(req, res, next) {
  try {
    const product = await warehouseService.getProductById(req.params.warehouseId, req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

// Update a product for a specific product in a specific warehouse
async function updateProductById(req, res, next) {
  try {
    const product = await warehouseService.updateProductById(req.params.warehouseId, req.params.id, req.body.quantity);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

const warehouseController = {
  create,
  getAll,
  getById,
  update,
  createProduct,
  getProductByWarehouseId,
  getProductById,
  updateProductById
};

module.exports = warehouseController;
