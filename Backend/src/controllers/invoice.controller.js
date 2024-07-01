
const invoiceService = require('../services/invoice.service');
const ProductService = require("../services/product.service");
const ShopService = require('../services/shop.service');
const Invoice = require('../models/invoice');

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
        
        // Calculate subtotal based on details
        let sub_total = 0;
        if (invoiceData.details && invoiceData.details.length > 0) {
            for (const detail of invoiceData.details) {
                const product = await ProductService.getProductById(detail.product); 
                if (!product) {
                    throw new Error('Not exists productId: ' + detail.product);
                }

                var productFrom = await ShopService.getProductById(invoiceData.from, detail.product);
                if (!productFrom) {
                    throw new Error('Not exists productId' + detail.product + 'in shop: ' + invoiceData.from);
                }

                if (product.status === 'inactive' || productFrom.status === 'inactive') {
                    throw new Error('Invalid status for productId: ' + detail.product);
                }

                if (productFrom.quantity - detail.quantity < 0) {
                    throw new Error('Invalid quantity for productId: ' + detail.product);
                }

                detail.unit_price = product.price;
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
        if (invoiceData.details && invoiceData.details.length > 0) {
            await Promise.all(invoiceData.details.map(detail =>
                ShopService.updateProductById(invoiceData.from, detail.product, -detail.quantity)
            ));
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

        //Reset quantity in from shop
        if (invoice.details && invoice.details.length > 0) {
            await Promise.all(invoice.details.map(detail =>
                ShopService.updateProductById(invoice.from, detail.product, detail.quantity)
            ));
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
                const product = await ProductService.getProductById(detail.product); 
                if (!product) {
                    throw new Error('Not exists productId: ' + detail.product);
                }

                var productFrom = await ShopService.getProductById(invoice.from, detail.product);
                if (!productFrom) {
                    throw new Error('Not exists productId' + detail.product + 'in shop: ' + invoice.from);
                }

                if (product.status === 'inactive' || productFrom.status === 'inactive') {
                    throw new Error('Invalid status for productId: ' + detail.product);
                }

                if (productFrom.quantity - detail.quantity < 0) {
                    throw new Error('Invalid quantity for productId: ' + detail.product);
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
        if (updateInvoice.details && updateInvoice.details.length > 0) {
            await Promise.all(updateInvoice.details.map(detail =>
                ShopService.updateProductById(invoice.from, detail.product, -detail.quantity)
            ));
        }

        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(error); 
    }
}

async function updateStatus(req, res, next) {
    try {
        const newStatus = req.body.status;
        const invoice = await Invoice.findById(req.params.id);
        if(!invoice) {
            throw new Error('Invoice not found');
        }
        
        if (invoice.status === 'completed' || invoice.status===newStatus 
        || (invoice.status==='cancelled' && newStatus==='completed')) 
            throw new Error(`Invoice ${invoice.status} cannot be updated to ${newStatus}`);
        
        if (!invoice) 
            res.status(404).json({ message: 'Invoice not found' });

        if (invoice.status === 'pending' && newStatus==='completed' && invoice.details && invoice.details.length > 0) {
            await Promise.all(invoice.details.map(detail =>{
                const product = ShopService.getProductById(invoice.to, detail.product);
                if (product) {
                    ShopService.updateProductById(invoice.to, detail.product, detail.quantity);
                } else {
                    ShopService.createOneProduct(invoice.to, {productId: detail.product, quantity: detail.quantity});
                }
            }));
        }

        if (invoice.status === 'pending' && newStatus==='cancelled' && invoice.details && invoice.details.length > 0) {
            await Promise.all(invoice.details.map(detail =>
                ShopService.updateProductById(invoice.from, detail.product, detail.quantity)
            ));
        }

        if (invoice.status === 'cancelled' && invoice.details && invoice.details.length > 0) {
            for (const detail of invoice.details) {
                const product = await ProductService.getProductById(detail.product); 
                const productFrom = await ShopService.getProductById(invoice.from, detail.product);

                if (product.status === 'inactive' || productFrom.status === 'inactive') {
                    throw new Error('Can\'t change this to pending because productId: ' + detail.product+ ' is already active');
                }

                if (productFrom.quantity - detail.quantity < 0) {
                    throw new Error('Can\'t change this to pending because productId: ' + detail.product+ ' is not enough quantity');
                }
            }
            await Promise.all(invoice.details.map(detail =>
                ShopService.updateProductById(invoice.from, detail.product, -detail.quantity)
            ));
        }
        const updatedInvoice = await invoiceService.updateInvoice(req.params.id, {status: newStatus});
        res.status(200).json(updatedInvoice);
    } catch (error) {
        next(error); 
    }
}

const invoiceController = {
    create,
    getAll,
    getById,
    updateInfo,
    updateStatus
};

module.exports = invoiceController;
