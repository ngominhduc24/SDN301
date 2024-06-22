const mongoose = require('mongoose');
require('./product')
const { Schema } = mongoose;

const DetailSchema = new Schema({
    "product": {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    "quantity": {
        type:Number,
        required: true,
        min: 0
    }
});

module.exports = DetailSchema;
