const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;
const Product = require('./product');
const Shop = require('./shop');
const User = require('./user');

const DetailSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: Product,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  unit_price : {
    type : Number,
    required: true,
    min: 0
  }
});

const InvoiceSchema = new Schema({
  invoice_code: {
    type: String,
    default: uuidv4,
    unique: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: Shop
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: Shop
  },
  details: [DetailSchema],
  sub_total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  },
  note: {
    type: String
  },
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  shipping_charge: {
    type: Number,
    min: 0
  },
  total_price: {
    type: Number,
    required: true,
    min: 0
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  }
}, {
  timestamps: true
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
