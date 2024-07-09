const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Define the Product schema for embedding
const ProductSchema = new Schema({
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category'
    },
  name: { 
    type: String, 
    required: true, 
  }, 
  description: { 
    type: String, 
    required: true, 
  }, 
  image: { 
    type: String, 
    required: true, 
  }, 
  price: { 
    type: Number, 
    required: true, 
  }, 
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  }
}); 

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
