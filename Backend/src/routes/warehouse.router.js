const bodyParser = require('body-parser');
const express = require('express');
const WarehouseController = require('../controllers/warehouse.controller');

const warehouseRouter = express.Router();
warehouseRouter.use(bodyParser.json());

/**
 * @swagger
 * /warehouse:
 *   post:
 *     summary: Create a new warehouse
 *     description: Add a new warehouse to the system.
 *     tags:
 *       - Warehouses
 *     requestBody:
 *       description: Warehouse object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.post('/', WarehouseController.create);

/**
 * @swagger
 * /warehouse:
 *   get:
 *     summary: Get all warehouses
 *     description: Retrieve a list of all warehouses.
 *     tags:
 *       - Warehouses
 *     responses:
 *       200:
 *         description: A list of warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.get('/', WarehouseController.getAll);

/**
 * @swagger
 * /warehouse/{id}:
 *   get:
 *     summary: Get a warehouse by ID
 *     description: Retrieve a single warehouse by its ID.
 *     tags:
 *       - Warehouses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *     responses:
 *       200:
 *         description: Warehouse retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       404:
 *         description: Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.get('/:id', WarehouseController.getById);

/**
 * @swagger
 * /warehouse/{id}:
 *   put:
 *     summary: Update a warehouse by ID
 *     description: Update the details of an existing warehouse by its ID.
 *     tags:
 *       - Warehouses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *     requestBody:
 *       description: Warehouse object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.put('/:id', WarehouseController.update);

/**
 * @swagger
 * /warehouse/{warehouseId}/product:
 *   post:
 *     summary: Create a product for a specific warehouse
 *     description: Add a new product to a specific warehouse.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *     requestBody:
 *       description: Product object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.post('/:warehouseId/product', WarehouseController.createProduct);

/**
 * @swagger
 * /warehouse/{warehouseId}/product:
 *   get:
 *     summary: Get all products for a specific warehouse
 *     description: Retrieve a list of all products for a specific warehouse.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Warehouse not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.get('/:warehouseId/product', WarehouseController.getProductByWarehouseId);

/**
 * @swagger
 * /warehouse/{warehouseId}/product/{id}:
 *   get:
 *     summary: Get a specific product by its ID within a specific warehouse
 *     description: Retrieve a specific product by its ID within a specific warehouse.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Warehouse or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.get('/:warehouseId/product/:id', WarehouseController.getProductById);

/**
 * @swagger
 * /warehouse/{warehouseId}/product/{id}:
 *   put:
 *     summary: Update a product by its ID within a specific warehouse
 *     description: Update the details of a specific product by its ID within a specific warehouse.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The warehouse ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       description: Product object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Warehouse or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
warehouseRouter.put('/:warehouseId/product/:id', WarehouseController.updateProductById);

module.exports = warehouseRouter;