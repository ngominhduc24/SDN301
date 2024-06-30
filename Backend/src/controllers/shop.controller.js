const asyncHandler = require('../utils/async-handle');
const shopService = require('../services/shop.service');
const ProductService = require("../services/product.service");

// Create a new shop
const create = asyncHandler(async (req, res, next) => {
  try {
    const shopData = {
      name: req.body.name,
      location: req.body.location,
      phone : req.body.phone,
      email : req.body.email,
      inventoryType : req.body.inventoryType,
      manager : req.body.manager
      };
    const newShop = await shopService.create(shopData);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
});

// Get all shops
async function getAll(req, res, next) {
  try {
    const shops = await shopService.getAll();
    res.status(200).send(shops);
  } catch (error) {
    next(error);
  }
}

// Get shop by ID
async function getById(req, res, next) {
  try {
    const shop = await shopService.getById(req.params.id);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
}

// Update shop by ID
async function update(req, res, next) {
  try {
    const updateShop = {
      name: req.body.name,
      location: req.body.location,
      phone : req.body.phone,
      email : req.body.email,
      manager : req.body.manager,
      status: req.body.status
      };
    const shop = await shopService.update(req.params.id, updateShop);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
}

// Create a product for a specific shop
async function createProduct(req, res, next) {
  try {
    const shop = await shopService.createProduct(req.params.shopId, req.body);
    res.status(201).send(shop);
  } catch (error) {
    next(error);
  }
}

// Get all products for a specific shop
async function getProductByShopId(req, res, next) {
  try {
    const products = await shopService.getProductByShopId(req.params.shopId);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
}

// Get all products for a specific shop
async function getProductNotAddedByShop(req, res, next) {
  try {
    // Get products added by the shop
    const productsAdded = await shopService.getProductByShopId(req.params.shopId);
    
    // Get all products
    const allProducts = await ProductService.listAllProducts();

    // Filter products not added by the shop
    const productsNotAdded = allProducts.filter(product => {
      return !productsAdded.some(addedProduct => addedProduct.productId.equals(product._id));
    });

    res.status(200).json(productsNotAdded);
  } catch (error) {
    next(error);
  }
}

// Get a specific product by its ID within a specific shop
async function getProductById(req, res, next) {
  try {
    const product = await shopService.getProductById(req.params.shopId, req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

// Update a product for a specific product in a specific shop
async function updateProductById(req, res, next) {
  try {
    const product = await shopService.updateProductById(req.params.shopId, req.params.id, req.body.quantity);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

// get warehouse info
async function getWarehouse(req, res, next) {
  try {
    console.log('getWarehouse');
    const warehouse = await shopService.getWarehouse();
    res.status(200).send(warehouse);
  } catch (error) {
    next(error);
  }
}

const shopController = { create, getAll, getById, update, getWarehouse,
  createProduct, getProductByShopId, getProductById, updateProductById, getProductNotAddedByShop };

module.exports = shopController;
