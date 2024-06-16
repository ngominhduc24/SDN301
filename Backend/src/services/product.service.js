const Product = require('../models/product');

class ProductService {
    // Authentication login service

    async ListAllProducts(req, res, next) {
        try {
            return await Product.find();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();