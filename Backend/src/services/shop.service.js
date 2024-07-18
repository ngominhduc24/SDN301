const Shop = require('../models/shop');
const Invoice = require('../models/invoice');
const Product = require('../models/product');
const Request = require('../models/request');


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
    const warehouses = await Shop.find({ inventoryType: 'warehouse' }).populate('manager');
    if (warehouses.length > 0) {
      return warehouses[0];
    } else {
      return null; 
    }
  } catch (error) {
    throw new Error(`Error retrieving warehouses: ${error.message}`);
  }
}

// Update shop by ID
async function update(id, data) {
  return await Shop.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

// Create list of product for a specific shop
async function createProduct(shopId, productData) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  if (!Array.isArray(productData)) {
    throw new Error('Product data must be an array');
  }

  productData.forEach(newProduct => {
    var product = Product.findById(newProduct.productId);
    if(!product) {
      throw new Error('Product not found');
    }
    const existingProduct = shop.products.find(p => p.productId.toString() === newProduct.productId.toString());
    if (existingProduct) {
      throw new Error('Product with id: ' + newProduct.productId + ' already exists for shopId: ' + shopId);
    } 
  });

  shop.products.push(...productData);
  await shop.save();
  return shop;
}

async function createOneProduct(shopId, productData) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  var product = Product.findById(productData.productId);
  if(!product) {
    throw new Error('Product not found');
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

// Get all invoice for a specific shop
async function getInvoiceToWithShopId(shopId) {
  const invoice = await Invoice.find({ to: shopId }).populate({path: 'from', select: '-products' }).populate({path: 'to', select: '-products' })
  .populate('details.productId').populate('created_by');
  return invoice;
}

async function getInvoiceFromWithShopId(shopId) {
  const invoice = await Invoice.find({ from: shopId }).populate({path: 'from', select: '-products' }).populate({path: 'to', select: '-products' })
  .populate('details.productId').populate('created_by');
  return invoice;
}

async function getRequestsByShopId(shopId) {
  const requests = await Request.find({ from: shopId }).populate({path: 'from', select: '_id name' })
  .populate('details.productId', '_id name description image status').populate('created_by', '_id');
  return requests;
}

// Get a specific product by its ID within a specific shop
async function getProductById(shopId, productId) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  const product = shop.products.find(prod => prod.productId.toString() === productId.toString());
  if (!product) {
    throw new Error('Product not found for productId: ' + productId);
  }
  return product;
}

async function getProById(shopId, productId) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  var product = shop.products.find(prod => prod.productId.toString() === productId.toString());
  return product || null;
}

// Add quantity to a specific product in a specific shop
async function updateProductById(shopId, productId, quantity, status) {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw new Error('Shop not found');
  }

  const product = shop.products.find(prod => prod.productId.toString() === productId.toString());
  if (!product) {
    throw new Error('Product not found for productId: ' + productId);
  }
  
  product.status = status;
  product.quantity = product.quantity + quantity;
  
  await shop.save();
  return product;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  createProduct,
  createOneProduct,
  getProductByShopId,
  getProductById,
  updateProductById,
  getWarehouse,
  getInvoiceToWithShopId,
  getInvoiceFromWithShopId,
  getProById,
  getRequestsByShopId
};
