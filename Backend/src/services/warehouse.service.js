const Warehouse = require('../models/warehouse');

// Create a new warehouse
async function create(data) {
  const warehouse = new Warehouse(data);
  return await warehouse.save();
}

// Get all warehouses
async function getAll() {
  return await Warehouse.find();
}

// Get warehouse by ID
async function getById(id) {
  return await Warehouse.findById(id);
}

// Update warehouse by ID
async function update(id, data) {
  return await Warehouse.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Create a product for a specific warehouse
async function createProduct(warehouseId, productData) {
  const warehouse = await Warehouse.findById(warehouseId);
  if (!warehouse) {
    throw new Error('Warehouse not found');
  }

  warehouse.products.push(productData);
  await warehouse.save();
  return warehouse;
}

// Get all products for a specific warehouse
async function getProductByWarehouseId(warehouseId) {
  const warehouse = await Warehouse.findById(warehouseId);
  if (!warehouse) {
    throw new Error('Warehouse not found');
  }
  return warehouse.products;
}

// Get a specific product by its ID within a specific warehouse
async function getProductById(warehouseId, productId) {
  const warehouse = await Warehouse.findById(warehouseId);
  if (!warehouse) {
    throw new Error('Warehouse not found');
  }

  const product = warehouse.products.id(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}

// Update a product for a specific product in a specific warehouse
async function updateProductById(warehouseId, productId, quantity) {
  const warehouse = await Warehouse.findById(warehouseId);
  if (!warehouse) {
    throw new Error('Warehouse not found');
  }

  const product = warehouse.products.id(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  product.quantity = quantity;
  await warehouse.save();
  return product;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  createProduct,
  getProductByWarehouseId,
  getProductById,
  updateProductById
};
