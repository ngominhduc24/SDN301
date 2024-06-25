const InvoiceService = require("../services/invoice.service");
const asyncHandler = require("../utils/async-handle");

const index = asyncHandler((req, res) => {
  InvoiceService.getListInvoices(req.params).then((data) => {
    res.status(200).json(data);
  });
});

const create = asyncHandler((req, res) => {
  const token = req.headers.authorization;
  InvoiceService.createInvoice(req.body, token).then((data) => {
    res.status(201).json(data);
  });
});

const invoiceController = { index, create };
module.exports = invoiceController;
