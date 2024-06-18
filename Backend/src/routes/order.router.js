const bodyParser = require('body-parser');
const express = require('express');
const OrderController = require('../controllers/order.controller');
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");
const orderRouter = express.Router();

//using middleware
orderRouter.use(bodyParser.json());
orderRouter.use(verifyTokenHandle.verifyToken);

//create routes
orderRouter.get('/', OrderController.index);
orderRouter.post('/', OrderController.create);

module.exports = orderRouter;