const Product = require('../models/product');
const excelJS = require("exceljs");
const fs = require('fs');

class ProductService {
    // List all products
    async listAllProducts() {
        try {
            return await Product.find().cache(250).exec();
        } catch (error) {
            throw error;
        }
    }

    async listAllActiveProducts() {
        try {
            return await Product.find({status: 'active'}).cache(250).exec();
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
          const product = await Product.findById(productId).populate('categoryId');
          if (!product) {
            throw new Error('Product not found for productId: ' + productId);
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
                { new: true, runValidators: true } 
            );
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async importProductsFromExcel(excelFile) {
        const failedRows = [];

        const workbook = new excelJS.Workbook();

        try {
            await workbook.xlsx.load(excelFile);
            const worksheet = workbook.getWorksheet(1);

            const products = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return;

                const productData = {
                    categoryId: row.getCell(1).value,
                    name: row.getCell(2).value,
                    description: row.getCell(3).value,
                    image: row.getCell(4).value,
                    price: row.getCell(5).value,
                    status: row.getCell(6).value || 'active'
                };


                products.push(productData);
            });

            for (const productData of products) {
                try {
                    const newProduct = new Product(productData);
                    await newProduct.save();
                } catch (error) {
                    failedRows.push(productData);
                }
            }

            // Log failed rows to a file
            if (failedRows.length > 0) {
                const logFilePath = 'failed_rows_log.json';
                fs.writeFileSync(logFilePath, JSON.stringify(failedRows, null, 2), 'utf8');
                console.log(`Failed rows have been logged to ${logFilePath}`);
            }

            return products.filter(p => !failedRows.includes(p));

        } catch (error) {
            throw error;
        }
    }

    async getDataFromImportFile(excelFile) {
        const workbook = new excelJS.Workbook();

        try {
            await workbook.xlsx.load(excelFile);
            const worksheet = workbook.getWorksheet(1);

            const products = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return;

                const productData = {
                    productId: row.getCell(1).value,
                    qunatity: row.getCell(2).value,
                };


                products.push(productData);
            });
            
            return products;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();
