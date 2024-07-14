const bodyParser = require('body-parser');
const express = require('express');
const ShopController = require('../controllers/shop.controller');

const shopRouter = express.Router();
shopRouter.use(bodyParser.json());

/**
 * @swagger
 * /Shop:
 *   post:
 *     summary: Create a new shop
 *     description: Add a new shop to the system.
 *     tags:
 *       - Shops
 *     requestBody:
 *       description: Shop object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
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
shopRouter.post('/', ShopController.create);

/**
 * @swagger
 * /Shop:
 *   get:
 *     summary: Get all shops
 *     description: Retrieve a list of all shops.
 *     tags:
 *       - Shops
 *     responses:
 *       200:
 *         description: A list of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
shopRouter.get('/', ShopController.getAll);

/**
 * @swagger
 * /Shop/{id}:
 *   get:
 *     summary: Get a shop by ID
 *     description: Retrieve a single shop by its ID.
 *     tags:
 *       - Shops
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
 *     responses:
 *       200:
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
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
shopRouter.get('/:id', ShopController.getById);

/**
 * @swagger
 * /Shop/{id}:
 *   put:
 *     summary: Update a shop by ID
 *     description: Update the details of an existing shop by its ID.
 *     tags:
 *       - Shops
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
 *     requestBody:
 *       description: Shop object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Shop not found
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
shopRouter.put('/:id', ShopController.update);

/**
 * @swagger
 * /Shop/{shopId}/product:
 *   post:
 *     summary: Create a product for a specific shop
 *     description: Add a new product to a specific shop.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
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
 *         description: Shop not found
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
shopRouter.post('/:shopId/product', ShopController.createProduct);

/**
 * @swagger
 * /Shop/{shopId}/product:
 *   get:
 *     summary: Get all products for a specific shop
 *     description: Retrieve a list of all products for a specific shop.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
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
 *         description: Shop not found
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
shopRouter.get('/:shopId/product', ShopController.getProductByShopId);

/**
 * @swagger
 * /Shop/{shopId}/product/{id}:
 *   get:
 *     summary: Get a specific product by its ID within a specific shop
 *     description: Retrieve a specific product by its ID within a specific shop.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
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
 *         description: Shop or product not found
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
shopRouter.get('/:shopId/product/:id', ShopController.getProductById);

/**
 * @swagger
 * /Shop/{shopId}/product/{id}:
 *   put:
 *     summary: Update a product by its ID within a specific shop
 *     description: Update the details of a specific product by its ID within a specific shop.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
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
 *         description: Shop or product not found
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
shopRouter.put('/:shopId/product/:id', ShopController.updateProductById);

shopRouter.get('/:shopId/product/unadded/getinfo', ShopController.getProductNotAddedByShop);

// WAREHOUSE MANAGER
shopRouter.get('/warehouse/getinfo', ShopController.getWarehouse);

// invoices
shopRouter.get('/:shopId/invoiceTo', ShopController.getInvoiceToByShopId); // get invoice by shopId
shopRouter.get('/:shopId/invoiceFrom', ShopController.getInvoiceFromByShopId); // get invoice by shopId
shopRouter.get('/:shopId/request', ShopController.getRequestsByShopId);
shopRouter.get('/revenue/daily', ShopController.getDailyRevenue);

module.exports = shopRouter;