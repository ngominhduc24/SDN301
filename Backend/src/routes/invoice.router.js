const bodyParser = require('body-parser');
const express = require('express');
const InvoiceController = require('../controllers/invoice.controller'); 

const router = express.Router();
router.use(bodyParser.json());

router.post('/', InvoiceController.create);
router.get('/', InvoiceController.getAll);
router.get('/:id', InvoiceController.getById);
router.put('/:id', InvoiceController.updateInfo);
router.put('/status/:id', InvoiceController.updateStatus);
// router.get('/export/:id', InvoiceController.exportInvoiceToPDF);

module.exports = router;
