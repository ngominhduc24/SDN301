const Invoice = require('../models/invoice');

async function createInvoice(data) {
    try {
        const newInvoice = new Invoice(data);
        return await newInvoice.save();
    } catch (error) {
        throw error; 
    }
}

async function getAllInvoices() {
    try {
        return await Invoice.find().populate({path: 'from', select: '-products' }).populate({path: 'to', select: '-products' })
        .populate('details.product').populate('created_by');
    } catch (error) {
        throw error; 
    }
}

async function getInvoiceById(id) {
    try {
        return await Invoice.findById(id).populate({path: 'from', select: '-products' }).populate({path: 'to', select: '-products' })
        .populate('details.product').populate('created_by');
    } catch (error) {
        throw error; 
    }
}

async function updateInvoice(id, data) {
    try {
        return await Invoice.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .populate('created_by');
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice
};
