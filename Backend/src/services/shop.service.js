const Shop = require('../models/shop');

// Create a new shop
async function create(data) {
  const shop = new Shop(data);
  return await shop.save();
}

// Get all shops
async function getAll() {
  return await Shop.find();
}

// Get shop by ID
async function getById(id) {
  return await Shop.findById(id);
}

// Update shop by ID
async function update(id, data) {
  return await Shop.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Create a product for a specific shop
async function createProduct(shopId, productData) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  shop.products.push(productData);
  await shop.save();
  return shop;
}

// Get all products for a specific shop
async function getProductByShopId(shopId) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }
  return shop.products;
}

// Get a specific product by its ID within a specific shop
async function getProductById(shopId, productId) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  const product = shop.products.id(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}

// Update a product for a specific product in a specific shop
async function updateProductById(shopId, productId, quantity) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  const product = shop.products.id(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  product.quantity = quantity;
  await shop.save();
  return product;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  createProduct,
  getProductByShopId,
  getProductById,
  updateProductById
};
