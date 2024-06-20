const Shop = require('../models/shop');


// Create a new shop
async function create(data) {
  const shop = new Shop(data);
  return await shop.save();
}

// Get all shops
async function getAll() {
  return await Shop.find({ inventoryType: 'shop' }).select('-products').populate('manager');
}

// Get shop by ID
async function getById(id) {
  return await Shop.findById(id).populate('manager');
}

// Get warehouse by ID
async function getWarehouse() {
  try {
    console.log("start");
    const warehouses = await Shop.find({ inventoryType: 'warehouse' }).populate('manager');
    console.log(warehouses);
    return warehouses;
  } catch (error) {
    throw new Error(`Error retrieving warehouses: ${error.message}`);
  }
}

// Get warehouse by ID
async function getWarehouse() {
  try {
    console.log("start");
    const warehouses = await Shop.find({ inventoryType: 'warehouse' });
    console.log(warehouses);
    return warehouses;
  } catch (error) {
    throw new Error(`Error retrieving warehouses: ${error.message}`);
  }
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
  const shop = await Shop.findById(shopId).populate('products.productId');
  if (!shop) {
    throw new Error('Shop not found');
  }
  return shop.products;
}

// Get a specific product by its ID within a specific shop
async function getProductById(shopId, productId) {
  const shop = await Shop.findById(shopId).populate('products.productId');
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
  updateProductById,
  getWarehouse
};
