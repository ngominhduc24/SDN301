const Shop = require('../models/shop');

// Create a new shop
async function create (req, res, next) {
  try {
    const shop = new Shop({
        name: req.body.name,
        location: req.body.location,
        phone : req.body.phone,
        email : req.body.email,
        manager : req.body.manager
      });
    await shop.save()
      .then(newDoc => res.status(201).json(newDoc))
      .catch(err => next(err));
  } catch (error) {
    next(error);
  }
};

// Get all shops
async function getAll (req, res, next) {
  try {
    const shops = await Shop.find();
    res.status(200).send(shops);
  } catch (error) {
    next(error);
  }
};

// Get shop by ID
async function getById (req, res, next) {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
};

// Update shop by ID
async function update (req, res, next) {
  try {
    const updateShop = {
        name: req.body.name,
        location: req.body.location,
        phone : req.body.phone,
        email : req.body.email,
        manager : req.body.manager,
        status: req.body.status
      };

    const shop = await Shop.findByIdAndUpdate(req.params.id, updateShop, { new: true, runValidators: true });
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
};

// Create a new shop
async function create (req, res, next) {
  try {
    const shop = new Shop({
        name: req.body.name,
        location: req.body.location,
        phone : req.body.phone,
        email : req.body.email,
        manager : req.body.manager,
        status: req.body.status
      });
    await shop.save()
      .then(newDoc => res.status(201).json(newDoc))
      .catch(err => next(err));
  } catch (error) {
    next(error);
  }
};

// Get all shops
async function getAll (req, res, next) {
  try {
    const shops = await Shop.find();
    res.status(200).send(shops);
  } catch (error) {
    next(error);
  }
};

// Get shop by ID
async function getById (req, res, next) {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
};

// Update shop by ID
async function update (req, res, next) {
  try {
    const updateShop = {
        name: req.body.name,
        location: req.body.location,
        phone : req.body.phone,
        email : req.body.email,
        manager : req.body.manager,
        status: req.body.status
      };

    const shop = await Shop.findByIdAndUpdate(req.params.id, updateShop, { new: true, runValidators: true });
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }
    res.status(200).send(shop);
  } catch (error) {
    next(error);
  }
};

// Create a product for a specific shop
const createProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }

    shop.products.push({ productId, quantity });
    await shop.save();

    res.status(201).send(shop);
  } catch (error) {
    next(error);
  }
};

// Get all products for a specific shop
const getProductByShopId = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }

    res.status(200).send(shop.products);
  } catch (error) {
    next(error);
  }
};

// Get a specific product by its ID within a specific shop
const getProductById = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }

    const product = shop.products.id(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

// Update a product for a specific product in a specific shop
const updateProductById = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const shop = await Shop.findById(req.params.shopId);
    if (!shop) {
      return res.status(404).send({ message: 'Shop not found' });
    }

    const product = shop.products.id(req.params.id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    product.quantity = quantity;
a
    await shop.save();

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

const shopController = { create, getAll, getById, update, 
  createProduct, getProductByShopId, getProductById, updateProductById };
module.exports = shopController;



