const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product schema for embedding
const productSchema = new Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true
    },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 
  }, 
  status: { 
    type: String, 
    enum: ['active', 'deactive'], 
    default: 'active' 
  }
}); 

// Define the Warehouse schema
const warehouseSchema = new Schema({
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
    ref: 'User', 
    required: true 
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


const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;
