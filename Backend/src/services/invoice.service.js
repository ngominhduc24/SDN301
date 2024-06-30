const Invoice = require("../models/invoice");
const Product = require("../models/product");
const productService = require("./product.service");
const ProductService = require("./product.service");
const tokenUtils = require('../utils/jwt-handle');

const getListInvoices = async (params) => {
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

    // Fetch Invoices from the database with pagination and optional user filter
    const Invoices = await Invoice.find(query)
      .populate('created_by')
      .populate('shop')
      .skip(skip)
      .limit(limit)
      .exec();
    const totalInvoices = await Invoice.countDocuments(query);

    return {
      data: Invoices,
      meta: {
        pageSize: Invoices.length,
        page,
        limit,
        totalPages: Math.ceil(totalInvoices / limit),
        totalInvoices,
        textSearch: text_search || '',
      },
    };
  } catch (error) {
    throw error;
  }
};

const createInvoice = (params, token) => {
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

    // return Invoice.create(params);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getListInvoices,
  createInvoice,
};
