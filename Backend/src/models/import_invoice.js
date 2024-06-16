const mongoose = require('mongoose');
const DetailSchema = require('./detail');

require("./warehouse");
require("./user");

const Schema = mongoose.Schema

const ImportInvoiceSchema = new Schema({
  "warehouse": {
    type: Schema.Types.ObjectId,
    ref: "warehouses"
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
    ref: 'users',
    required: true
  }
}, {
  timestamps: true
})

const ImportInvoice = mongoose.model('import_invoices', ImportInvoiceSchema)

module.exports = ImportInvoice;
