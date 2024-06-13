const Warehouse = require('../models/warehouse');

// Create a new warehouse
async function create(req, res, next) {
  try {
    const warehouse = new Warehouse({
      name: req.body.name,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
      manager: req.body.manager
    });
    await warehouse.save()
      .then(newDoc => res.status(201).json(newDoc))
      .catch(err => next(err));
  } catch (error) {
    next(error);
  }
}

// Get all warehouses
async function getAll(req, res, next) {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).send(warehouses);
  } catch (error) {
    next(error);
  }
}

// Get warehouse by ID
async function getById(req, res, next) {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
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

    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, updateWarehouse, { new: true, runValidators: true });
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }
    res.status(200).send(warehouse);
  } catch (error) {
    next(error);
  }
}

// Create a product for a specific warehouse
const createProduct = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }

    warehouse.products.push({ productId, quantity });
    await warehouse.save();

    res.status(201).send(warehouse);
  } catch (error) {
    next(error);
  }
}

// Get all products for a specific warehouse
const getProductByWarehouseId = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }

    res.status(200).send(warehouse.products);
  } catch (error) {
    next(error);
  }
}

// Get a specific product by its ID within a specific warehouse
const getProductById = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }

    const product = warehouse.products.id(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

// Update a product for a specific product in a specific warehouse
const updateProductById = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const warehouse = await Warehouse.findById(req.params.warehouseId);
    if (!warehouse) {
      return res.status(404).send({ message: 'Warehouse not found' });
    }

    const product = warehouse.products.id(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    product.quantity = quantity;

    await warehouse.save();

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

const warehouseController = { create, getAll, getById, update, 
  createProduct, getProductByWarehouseId, getProductById, updateProductById };
module.exports = warehouseController;
