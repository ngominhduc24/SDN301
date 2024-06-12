const mongoose = require("mongoose");
const DetailSchema = require("./detail");

require("./warehouse");
require("./user");
require("./shop");

const Schema = mongoose.Schema;

const ExportInvoiceSchema = new Schema(
  {
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
    },
    shop: {
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

const ExportInvoice = mongoose.model("export_invoices", ExportInvoiceSchema);

module.exports = ExportInvoice;
