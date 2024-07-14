const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');
const Shop = require('./shop');
const User = require('./user');

const requestItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    quantity: {
        type: Number,
        min: 1
    },
    updateQuantity: {
        type: Number,
        min: 1
    }
});

const requestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: Shop,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    },
    details: [requestItemSchema],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
}, {
    timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;

