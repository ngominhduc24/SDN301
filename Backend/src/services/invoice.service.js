const mongoose = require('mongoose');
const Invoice = require("../models/invoice");
const Shop = require("../models/shop");
const path = require("path");
const pdfMaster = require("pdf-master");
const fs = require('fs').promises;
const {uploadToS3} = require("../utils/s3");

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
      const templatePath = path.join(__dirname, '..', 'views', 'export', 'invoice.hbs');
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

      // Path to directory for saving PDF files
      const saveDir = path.join(__dirname, '..', 'storage');
      // Ensure the directory exists, create it if not
      await fs.mkdir(saveDir, { recursive: true });

      // Generate PDF using pdfMaster
      const pdfBuffer = await pdfMaster.generatePdf(templatePath, templateData);

      // Generate a unique filename
      const fileName = `invoice_${invoiceId}.pdf`;
      const filePath = path.join(saveDir, fileName);

     // Write the PDF buffer to the file system
     await fs.writeFile(filePath, pdfBuffer, { flag: 'w' });

     // Upload PDF to S3
     const s3UploadPromise = new Promise((resolve, reject) => {
         uploadToS3(filePath, (error, data) => {
             if (error) {
                 reject(error);
             } else {
                 resolve(data.Location);
             }
         });
     });

     const s3Url = await s3UploadPromise;

     // Clean up the local file after uploading to S3
     await fs.unlink(filePath);

     // Return the URL of the uploaded PDF
     return s3Url;


  } catch (error) {
      throw error;
  }
}

async function getStatisticsForAShop(shopId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month - 0, 1);

    //total revenue, total order, total quantity in a specific month
    const revenue = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" },
          totalOrders: { $sum: 1 },
          totalOrderQuantity: { $sum: "$details.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          totalOrderQuantity: 1
        }
      }
    ]);

    //total import money, total quantity in a specific month
    const importProduct = await Invoice.aggregate([
      {
        $match: {
          to: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalImportCost: { $sum: "$total_price" },
          totalImportQuantity: { $sum: "$details.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          totalImportCost: 1,
          totalImportQuantity: 1
        }
      }
    ]);

    //total remain product quantity
    const totalImport = await Invoice.aggregate([
      {
        $match: {
          to: new mongoose.Types.ObjectId(shopId),
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const totalExport = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const revenueByDay = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          revenue: { $sum: "$total_price" }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          revenue: 1
        }
      }
    ]);

    const totalInvoices = await Invoice.countDocuments({
      from: new mongoose.Types.ObjectId(shopId),
      createdAt: { $gte: startDate, $lt: endDate }
    });

    const cancelledInvoices = await Invoice.countDocuments({
      from: new mongoose.Types.ObjectId(shopId),
      createdAt: { $gte: startDate, $lt: endDate },
      status: "cancelled"
    });

    const cancellationRate = (totalInvoices > 0 ? (cancelledInvoices / totalInvoices) * 100 : 0).toFixed(2);

    const top5SellingProductsByQuantity = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 
        }
      },
      { $sort: { totalQuantity: -1 } }, 
      { $limit: 5 } 
    ]);

    const least5SellingProductsByQuantity  = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 
        }
      },
      { $sort: { totalQuantity: 1 } }, 
      { $limit: 5 }
    ]);

    const revenueFormatted = revenue.length > 0 ? revenue[0] : {
      totalRevenue: 0,
      totalOrders: 0,
      totalOrderQuantity: 0
    }

    const importProductFormatted = importProduct.length > 0 ? importProduct[0] : {
      totalQuantity: 0,
      totalCost: 0
    }
    
    return {
      ...revenueFormatted,
      ...importProductFormatted,
      remainQuantity: (totalImport[0] ? totalImport[0].totalQuantity : 0) - (totalExport[0] ? totalExport[0].totalQuantity : 0),
      remainProductValue: (totalImport[0] ? totalImport[0].totalCost : 0) - (totalExport[0] ? totalExport[0].totalCost : 0),
      revenueByDay,
      cancellationRate: {
        totalInvoices,
        cancelledInvoices,
        cancellationRate 
      },
      top5SellingProductsByQuantity,
      least5SellingProductsByQuantity
    };
    
  } catch (error) {
    throw error;
  }
};

async function getStatisticsForWarehouse(shopId, year, month) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month - 0, 1);

    //total revenue, total order, total quantity in a specific month
    const revenue = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" },
          totalOrders: { $sum: 1 },
          totalOrderQuantity: { $sum: "$details.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          totalOrderQuantity: 1
        }
      }
    ]);

    //total import money, total quantity in a specific month
    const importProduct = await Invoice.aggregate([
      {
        $match: {
          to: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalImportCost: { $sum: "$total_price" },
          totalImportQuantity: { $sum: "$details.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          totalImportCost: 1,
          totalImportQuantity: 1
        }
      }
    ]);

    //total remain product quantity
    const totalImport = await Invoice.aggregate([
      {
        $match: {
          to: new mongoose.Types.ObjectId(shopId),
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const totalExport = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const revenueByDay = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          revenue: { $sum: "$total_price" }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          revenue: 1
        }
      }
    ]);

    const totalInvoices = await Invoice.countDocuments({
      from: new mongoose.Types.ObjectId(shopId),
      createdAt: { $gte: startDate, $lt: endDate }
    });

    const cancelledInvoices = await Invoice.countDocuments({
      from: new mongoose.Types.ObjectId(shopId),
      createdAt: { $gte: startDate, $lt: endDate },
      status: "cancelled"
    });

    const cancellationRate = (totalInvoices > 0 ? (cancelledInvoices / totalInvoices) * 100 : 0).toFixed(2);

    const top5SellingProductsByQuantity = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' } 
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 
        }
      },
      { $sort: { totalQuantity: -1 } }, 
      { $limit: 5 } 
    ]);

    const least5SellingProductsByQuantity  = await Invoice.aggregate([
      {
        $match: {
          from: new mongoose.Types.ObjectId(shopId),
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' } 
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 
        }
      },
      { $sort: { totalQuantity: 1 } }, 
      { $limit: 5 } 
    ]);

    const top5ShopsByRevenue = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'to',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: '$to', 
          totalRevenue: { $sum: '$total_price' }
        }
      },
      {
        $sort: {
          totalRevenue: -1 
        }
      },
      {
        $limit: 5 
      },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $project: {
          _id: 0,
          shopId: '$_id',
          shopName: '$shopDetails.name',
          totalRevenue: 1,
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalRevenue", revenue[0].totalRevenue] }, 100] }, 2]
          } 
        }
      }
    ]);

    const bottom5ShopsByRevenue = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'to',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: '$to', 
          totalRevenue: { $sum: '$total_price' }
        }
      },
      {
        $sort: {
          totalRevenue: 1 
        }
      },
      {
        $limit: 5 
      },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $project: {
          _id: 0,
          shopId: '$_id',
          shopName: '$shopDetails.name',
          totalRevenue: 1,
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalRevenue", revenue[0].totalRevenue] }, 100] }, 2]
          } 
        }
      }
    ]);

    const revenueFormatted = revenue.length > 0 ? revenue[0] : {
      totalRevenue: 0,
      totalOrders: 0,
      totalOrderQuantity: 0
    }

    const importProductFormatted = importProduct.length > 0 ? importProduct[0] : {
      totalQuantity: 0,
      totalCost: 0
    }
    
    return {
      ...revenueFormatted,
      ...importProductFormatted,
      remainQuantity: (totalImport[0] ? totalImport[0].totalQuantity : 0) - (totalExport[0] ? totalExport[0].totalQuantity : 0),
      remainProductValue: (totalImport[0] ? totalImport[0].totalCost : 0) - (totalExport[0] ? totalExport[0].totalCost : 0),
      revenueByDay,
      cancellationRate: {
        totalInvoices,
        cancelledInvoices,
        cancellationRate 
      },
      top5SellingProductsByQuantity,
      least5SellingProductsByQuantity,
      top5ShopsByRevenue,
      bottom5ShopsByRevenue
    };
    
  } catch (error) {
    throw error;
  }
};

async function getStatisticsForAllShops(year, month) {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month - 0, 1);

    //total revenue, total order, total quantity in a specific month
    const revenue = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: '$details'
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total_price' },
          totalOrders: { $sum: 1 },
          totalOrderQuantity: { $sum: '$details.quantity' }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          totalOrderQuantity: 1
        }
      }
    ]);

    //total import money, total quantity in a specific month
    const importProduct = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'to',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalImportCost: { $sum: "$total_price" },
          totalImportQuantity: { $sum: "$details.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          totalImportCost: 1,
          totalImportQuantity: 1
        }
      }
    ]);

    //total remain product quantity
    const totalImport = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'to',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const totalExport = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $lt: endDate },
          status: "completed"
        }
      },
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$details.quantity" },
          totalCost: { $sum: "$sub_total" }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalCost: 1
        }
      }
    ]);

    const revenueFormatted = revenue.length > 0 ? revenue[0] : {
      totalRevenue: 0,
      totalOrders: 0,
      totalOrderQuantity: 0
    }

    const importProductFormatted = importProduct.length > 0 ? importProduct[0] : {
      totalQuantity: 0,
      totalCost: 0
    }

    const revenueByDay = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          revenue: { $sum: "$total_price" }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          revenue: 1
        }
      }
    ]);

    const totalInvoices = await Invoice.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    const cancelledInvoices = await Invoice.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
      status: "cancelled"
    });

    const cancellationRate = (totalInvoices > 0 ? (cancelledInvoices / totalInvoices) * 100 : 0).toFixed(2);

    const top5SellingProductsByQuantity = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' } 
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 

        }
      },
      { $sort: { totalQuantity: -1 } }, 
      { $limit: 5 } 
    ]);

    const least5SellingProductsByQuantity  = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      { $unwind: '$details' },
      {
        $group: {
          _id: '$details.productId',
          totalQuantity: { $sum: '$details.quantity' } 
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          prductId: '$_id',
          productName: '$productDetails.name',
          image: '$productDetails.image',
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalQuantity", revenue[0].totalOrderQuantity] }, 100] }, 2]
          } 

        }
      },
      { $sort: { totalQuantity: 1 } }, 
      { $limit: 5 } 
    ]);

    const top5ShopsByRevenue = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: '$from', 
          totalRevenue: { $sum: '$total_price' }
        }
      },
      {
        $sort: {
          totalRevenue: -1 
        }
      },
      {
        $limit: 5 
      },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $project: {
          _id: 0,
          shopId: '$_id',
          shopName: '$shopDetails.name',
          totalRevenue: 1,
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalRevenue", revenue[0].totalRevenue] }, 100] }, 2]
          } 
        }
      }
    ]);

    const bottom5ShopsByRevenue = await Invoice.aggregate([
      {
        $lookup: {
          from: 'shops',
          localField: 'from',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $match: {
          'shopDetails.inventoryType': 'shop',
          createdAt: { $gte: startDate, $lt: endDate },
          status: "completed"
        }
      },
      {
        $group: {
          _id: '$from', 
          totalRevenue: { $sum: '$total_price' }
        }
      },
      {
        $sort: {
          totalRevenue: 1 
        }
      },
      {
        $limit: 5 
      },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shopDetails'
        }
      },
      {
        $unwind: '$shopDetails'
      },
      {
        $project: {
          _id: 0,
          shopId: '$_id',
          shopName: '$shopDetails.name',
          totalRevenue: 1,
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$totalRevenue", revenue[0].totalRevenue] }, 100] }, 2]
          } 
        }
      }
    ]);

    return {
      ...revenueFormatted,
      ...importProductFormatted,
      remainQuantity: (totalImport[0] ? totalImport[0].totalQuantity : 0) - (totalExport[0] ? totalExport[0].totalQuantity : 0),
      remainProductValue: (totalImport[0] ? totalImport[0].totalCost : 0) - (totalExport[0] ? totalExport[0].totalCost : 0),
      revenueByDay,
      cancellationRate: {
        totalInvoices,
        cancelledInvoices,
        cancellationRate 
      },
      top5SellingProductsByQuantity,
      least5SellingProductsByQuantity,
      top5ShopsByRevenue,
      bottom5ShopsByRevenue
    };
    
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
  getStatisticsForAShop,
  getStatisticsForWarehouse,
  getStatisticsForAllShops
};
