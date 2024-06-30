const bodyParser = require('body-parser');
const express = require('express');
const InvoiceController = require('../controllers/invoice.controller');
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");
const orderRouter = express.Router();

//using middleware
orderRouter.use(bodyParser.json());
orderRouter.use(verifyTokenHandle.verifyToken);

//create routes
orderRouter.get('/', InvoiceController.index);
orderRouter.post('/', InvoiceController.create);

module.exports = orderRouter;