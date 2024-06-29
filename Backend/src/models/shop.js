const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');
const User = require('./user');

// Define the Product schema for embedding
const productSchema = new Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: Product, 
    required: true
    },
  quantity: { 
    type: Number, 
    default: 0,
    min: 0 
  }, 
  status: { 
    type: String, 
    enum: ['active', 'deactive'], 
    default: 'active' 
  }
}); 

// Define the Shop schema
const shopSchema = new Schema({
  name: { 
    type: String, 
    required: true
  },
  location: {
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10,15}$/ 
  },
  email: { 
    type: String, 
    required: true, 
    match: /^\S+@\S+\.\S+$/ 
  },
  manager: { 
    type: Schema.Types.ObjectId, 
    ref: User, 
    required: true 
  },
  inventoryType: { 
    type: String, 
    enum: ['shop', 'warehouse'], 
    default: 'shop' 
  },
  products: [productSchema], 
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open' 
  }
}, {
    timestamps: true
});


const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
