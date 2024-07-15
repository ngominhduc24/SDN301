const invoiceService = require('../services/invoice.service');
const ProductService = require("../services/product.service");
const ShopService = require('../services/shop.service');
const RequestService = require('../services/request.service');

const Request = require('../models/request');
const Invoice = require('../models/invoice');
const fs = require('fs');

async function create(req, res, next) {
    try {
        const invoiceData = {
            from: req.body.from,
            to: req.body.to,
            details: req.body.details, 
            note: req.body.note,
            discount: req.body.discount,
            shipping_charge: req.body.shipping_charge,
            created_by: req.body.created_by
        };

        if(invoiceData.from ==null && invoiceData.to == null) {
            throw new Error('Invalid from and to');
        }
        
        // Calculate subtotal based on details
        let sub_total = 0;
        if (invoiceData.details && invoiceData.details.length > 0) {
            for (const detail of invoiceData.details) {
                const product = await ProductService.getProductById(detail.productId); 
                if (!product) {
                    throw new Error('Not exists productId: ' + detail.productId);
                }

                if(invoiceData.from !=null && invoiceData.from != undefined  && invoiceData.from != "") {
                    var productFrom = await ShopService.getProductById(invoiceData.from, detail.productId);
                    if (!productFrom) {
                        throw new Error('Not exists productId' + detail.productId + 'in shop: ' + invoiceData.from);
                    }
                    if(productFrom.status === 'inactive') {
                        throw new Error('Invalid status for productId: ' + detail.productId + 'in shop: ' + invoiceData.from);
                    }
                    if (productFrom.quantity - detail.quantity < 0) {
                        throw new Error('Invalid quantity for productId: ' + detail.productId);
                    }
                } 
                
                if(detail.unit_price == null) {
                    detail.unit_price = product.price;
                }
                
                sub_total += detail.quantity * detail.unit_price;
            }
        }
        invoiceData.sub_total = sub_total;

        // Calculate total_price
        const discountAmount = (invoiceData.discount / 100) * invoiceData.sub_total;
        invoiceData.total_price = invoiceData.sub_total - discountAmount + invoiceData.shipping_charge;
        
        //Create invoice
        const newInvoice = await invoiceService.createInvoice(invoiceData);

        // Update product quantity
        if(invoiceData.from !=null && invoiceData.from != undefined  && invoiceData.from != "") {
            if (invoiceData.details && invoiceData.details.length > 0) {
                await Promise.all(invoiceData.details.map(detail =>
                    ShopService.updateProductById(invoiceData.from, detail.productId, -detail.quantity)
                ));
            }
        }

        if(req.body.requestId){
            request = await RequestService.updateRequest(req.body.requestId, {invoice_id: newInvoice._id, status: 'accepted'});
        }

        res.status(201).json(newInvoice);
    } catch (error) {
        next(error); 
    }
}

async function getAll(req, res, next) {
    try {
        const invoices = await invoiceService.getAllInvoices();
        res.status(200).json(invoices);
    } catch (error) {
        next(error); 
    }
}

async function getById(req, res, next) {
    try {
        const invoice = await invoiceService.getInvoiceById(req.params.id);
        if (!invoice) 
            res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (error) {
        next(error); 
    }
}

async function updateInfo(req, res, next) {
    try {
        var invoice = await Invoice.findById(req.params.id);
        if(!invoice) {
            throw new Error('Invoice not found');
        }
        if (invoice.status !== 'pending') {
            throw new Error('Only pending invoice can be updated');
        }

        if(invoice.from ==null && req.body.to == null) {
            throw new Error('Invalid from and to');
        }

        //Reset quantity in from
        if(invoice.from !=null && invoice.from != undefined  && invoice.from != "") {
            if (invoice.details && invoice.details.length > 0) {
                await Promise.all(invoice.details.map(detail =>
                    ShopService.updateProductById(invoice.from, detail.productId, detail.quantity)
                ));
            }
        }
        
        const updateInvoice = {
            to: req.body.to,
            details: req.body.details, 
            note: req.body.note,
            discount: req.body.discount,
            shipping_charge: req.body.shipping_charge,
            created_by: req.body.created_by
        };

        // Calculate subtotal based on details
        let sub_total = 0;
        if (updateInvoice.details && updateInvoice.details.length > 0) {
            for (const detail of updateInvoice.details) {
                const product = await ProductService.getProductById(detail.productId); 
                if (!product) {
                    throw new Error('Not exists productId: ' + detail.productId);
                }

                if(invoice.from !=null && invoice.from != undefined  && invoice.from != "") {
                    var productFrom = await ShopService.getProductById(invoice.from, detail.productId);
                    if (!productFrom) {
                        throw new Error('Not exists productId' + detail.productId + 'in shop: ' + invoice.from);
                    }
                    if(productFrom.status === 'inactive') {
                        throw new Error('Invalid status for productId: ' + detail.productId + 'in shop: ' + invoice.from);
                    }
                    if (productFrom.quantity - detail.quantity < 0) {
                        throw new Error('Invalid quantity for productId: ' + detail.productId);
                    }
                }
                
                detail.unit_price = product.price;
                sub_total += detail.quantity * detail.unit_price;
            }
        }
        updateInvoice.sub_total = sub_total;
        
        // Calculate total_price
        const discountAmount = (updateInvoice.discount / 100) * updateInvoice.sub_total;
        updateInvoice.total_price = updateInvoice.sub_total - discountAmount + updateInvoice.shipping_charge;

        //Update invoice
        const updatedInvoice = await invoiceService.updateInvoice(req.params.id, updateInvoice);
        if (!updatedInvoice) 
            res.status(404).json({ message: 'Invoice not found' });

        // Update product quantity
        if(invoice.from !=null && invoice.from != undefined  && invoice.from != "") {
            if (updateInvoice.details && updateInvoice.details.length > 0) {
                await Promise.all(updateInvoice.details.map(detail =>
                    ShopService.updateProductById(invoice.from, detail.productId, -detail.quantity)
                ));
            }
        }

        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(error); 
    }
}

async function updateStatus(req, res, next) {
    try {
        const newStatus = req.body.status;
        const note = req.body.note;
        const invoice = await Invoice.findById(req.params.id);
        if(!invoice) {
            throw new Error('Invoice not found');
        }
        
        if (invoice.status === 'completed' || invoice.status===newStatus 
        || (invoice.status==='cancelled' && newStatus==='completed')) 
            throw new Error(`Invoice ${invoice.status} cannot be updated to ${newStatus}`);
            
        if (invoice.status === 'pending' && newStatus==='completed' && invoice.details && invoice.details.length > 0) {
            if(invoice.to !=null && invoice.to != undefined  && invoice.to != "") {
                await Promise.all(invoice.details.map(async (detail) =>{
                    const product = await ShopService.getProById(invoice.to, detail.productId);
                    if (product) {
                        await ShopService.updateProductById(invoice.to, detail.productId, detail.quantity);
                    } else {
                        await ShopService.createOneProduct(invoice.to, {productId: detail.productId, quantity: detail.quantity});
                    }
                }));
            }
            await Request.findOneAndUpdate({invoice_id: invoice._id}, {status: 'completed'})
        }

        if (invoice.status === 'pending' && newStatus==='cancelled' && invoice.details && invoice.details.length > 0) {
            if(invoice.from !=null && invoice.from != undefined  && invoice.from != "") {
                await Promise.all(invoice.details.map(detail =>
                    ShopService.updateProductById(invoice.from, detail.productId, detail.quantity)
                ));
            }
        }

        if (invoice.status === 'cancelled' && invoice.details && invoice.details.length > 0) {
            if(invoice.from !=null && invoice.from != undefined  && invoice.from != "") {
                for (const detail of invoice.details) {
                    const product = await ProductService.getProductById(detail.productId); 
                    const productFrom = await ShopService.getProductById(invoice.from, detail.productId);
    
                    if (product.status === 'inactive' || productFrom.status === 'inactive') {
                        throw new Error('Can\'t change this to pending because productId: ' + detail.productId+ ' is already active');
                    }
    
                    if (productFrom.quantity - detail.quantity < 0) {
                        throw new Error('Can\'t change this to pending because productId: ' + detail.productId+ ' is not enough quantity');
                    }
                }
                await Promise.all(invoice.details.map(detail =>
                    ShopService.updateProductById(invoice.from, detail.productId, -detail.quantity)
                ));
            }
        }

        const existingInvoice = await invoiceService.getInvoiceById(req.params.id);
        const updatedNote = existingInvoice.note + " " + note;
        
        const updatedInvoice = await invoiceService.updateInvoice(req.params.id, {status: newStatus, note: updatedNote});
        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(error); 
    }
}

async function exportInvoiceToPDF(req, res) {
    try {
        const { id } = req.params;
        const pdfFile = await invoiceService.exportInvoiceToPDF(id);

         res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=invoice.pdf'
        });
        res.status(200).send(pdfFile);
    } catch (error) {
        console.error('Error exporting invoice:', error.message, error.stack);
        res.status(500).json({ message: 'Error exporting invoice', errors: error.message });
    }
}

const invoiceController = {
    create,
    getAll,
    getById,
    updateInfo,
    updateStatus,
    exportInvoiceToPDF
};

module.exports = invoiceController;
