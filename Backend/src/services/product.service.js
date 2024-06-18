const Product = require('../models/product');

class ProductService {
    // List all products
    async listAllProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
          const product = await Product.findById(productId);
          if (!product) {
            throw new Error('Product not found');
          }
          return product;
        } catch (error) {
          throw error;
        }
      }

    // Create a new product
    async createProduct(productData) {
        try {
            const newProduct = new Product(productData);
            return await newProduct.save();
        } catch (error) {
            throw error;
        }
    }

    // Update an existing product by ID
    async updateProduct(productId, updateData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updateData,
                { new: true, runValidators: true } // Return the updated document and run validation
            );
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();