const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product schema for embedding
const ProductSchema = new Schema({
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true
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
    enum: ['active', 'deactive'], 
    default: 'active' 
  }
}); 

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
