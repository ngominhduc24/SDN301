const OrderService = require("../services/order.service");
const asyncHandler = require("../utils/async-handle");

const index = asyncHandler((req, res) => {
  OrderService.getListOrders(req.params).then((data) => {
    res.status(200).json(data);
  });
});

const create = asyncHandler((req, res) => {
  const token = req.headers.authorization;
  OrderService.createOrder(req.body, token).then((data) => {
    res.status(201).json(data);
  });
});

const orderController = { index, create };
module.exports = orderController;
