const Order = require("../models/order");
const Product = require("../models/product");
const productService = require("../services/product.service");
const ProductService = require("../services/product.service");
const tokenUtils = require('../utils/jwt-handle');

const getListOrders = async (params) => {
  try {
    let { page, limit, user_id, text_search } = params;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const query = {};

    if (text_search) {
      query.note = text_search; 
    }

    if (user_id) {
      query.created_by = user_id;
    }

    // Fetch orders from the database with pagination and optional user filter
    const orders = await Order.find(query)
      .populate('created_by')
      .populate('shop')
      .skip(skip)
      .limit(limit)
      .exec();
    const totalOrders = await Order.countDocuments(query);

    return {
      data: orders,
      meta: {
        pageSize: orders.length,
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        textSearch: text_search || '',
      },
    };
  } catch (error) {
    throw error;
  }
};

const createOrder = (params, token) => {
  try {
    // const user = tokenUtils.getUserFromToken(token);
    const totalPrice = params.details.map((detail) => {
      let prod = productService.getProductById(detail.product);
      console.log(prod);
      return prod.price * detail.quantity;
    });
    // console.log(params.details.map((detail) => {
    //   return prodPrice = Product.findById(detail.product);
    // }));
    // console.log(totalPrice);
    // params.total_price = totalPrice;
    // TO-DO: wait for getting user by token
    params.created_by = '666da0d2b11171a998827c9f';

    // return Order.create(params);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListOrders,
  createOrder,
};
