const mongoose = require('mongoose');
const Schema = mongoose.Schema

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

const InvoiceSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "shops",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "shops",
    },
    details: [DetailSchema],
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
    },
    note: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
