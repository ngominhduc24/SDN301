const mongoose = require('mongoose');
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
        .populate('details.productId').populate('created_by');
    } catch (error) {
        throw error; 
    }
}

async function getInvoiceById(id) {
    try {
        return await Invoice.findById(id).populate({path: 'from', select: '-products' }).populate({path: 'to', select: '-products' })
        .populate('details.productId').populate('created_by');
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

async function getDailyRevenue(shopId, year, month) {
    try {
        // Xác định khoảng thời gian từ đầu tháng đến cuối tháng
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month - 0, 1);
       
        // Lấy dữ liệu doanh thu từ MongoDB
        const revenueData = await Invoice.aggregate([
            { 
                $match: {
                    from: new mongoose.Types.ObjectId(shopId),
                    createdAt: { $gte: startDate, $lt: endDate },
                    status: "completed"
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$createdAt" } ,
                    totalRevenue: { $sum: "$total_price" }
                }
            },
            {
                $sort: { "_id": 1 }
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id",
                    totalRevenue: 1
                }
            }
        ]);

        return revenueData;
    } catch (error) {
        throw error; 
    }
};


module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    getDailyRevenue
};
