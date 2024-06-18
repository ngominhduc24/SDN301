const mongoose = require('mongoose');
const DetailSchema = require('./detail');
require('./shop');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    "shop": {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    "details": [DetailSchema],
    "total_price": {
        type: Number,
        required: true,
        min: 0
    },
    "status": {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      required: true
    },
    "note": {
        type: String,
    },
    "created_by": {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
{
    timestamps: true
})

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;
