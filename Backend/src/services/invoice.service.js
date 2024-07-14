const mongoose = require('mongoose');
const Invoice = require("../models/invoice");
const path = require("path");
const pdfMaster = require("pdf-master");

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
    return await Invoice.find()
      .populate({ path: "from", select: "-products" })
      .populate({ path: "to", select: "-products" })
      .populate("details.productId")
      .populate("created_by");
  } catch (error) {
    throw error;
  }
}

async function getInvoiceById(id) {
  try {
    return await Invoice.findById(id)
      .populate({ path: "from", select: "-products" })
      .populate({ path: "to", select: "-products" })
      .populate("details.productId")
      .populate("created_by");
  } catch (error) {
    throw error;
  }
}

async function updateInvoice(id, data) {
  try {
    return await Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("created_by");
  } catch (error) {
    throw error;
  }
}

async function exportInvoiceToPDF(invoiceId) {
  try {
    // Fetch invoice data from MongoDB
    const invoice = await Invoice.findById(invoiceId)
            .populate('details.productId')
            .populate('from')
            .populate('to')
            .exec();

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        // Prepare data for rendering in Handlebars template
        const templateData = {
            invoice_code: invoice.invoice_code,
            from: invoice.from ? invoice.from.name : 'N/A',
            to: invoice.to ? invoice.to.name : 'N/A',
            status: invoice.status,
            note: invoice.note || 'N/A',
            discount: invoice.discount,
            shipping_charge: invoice.shipping_charge,
            total_price: invoice.total_price,
            details: invoice.details.map(detail => ({
                productId: detail.productId._id,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
                total_price_per_item: detail.quantity * detail.unit_price
            }))
        };

    // Path to HTML template file
    const templatePath = path.join(
      __dirname,
      "..",
      "views",
      "export",
      "invoice.hbs"
    );
    let options = {
      displayHeaderFooter: true,
      format: "A4",
      headerTemplate: `<h3> Invoice </h3>`,
      footerTemplate: `<h3> Copyright 2024 </h3>`,
      margin: { top: "80px", bottom: "100px" },
    };
    let PDF = await pdfMaster.generatePdf(templatePath, templateData, options);

    return PDF;
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
  exportInvoiceToPDF,
  getDailyRevenue
};
