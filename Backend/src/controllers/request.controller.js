const RequestService = require('../services/request.service');
const NotificationService = require('../services/notification.service');
const shopService = require('../services/shop.service');
const Request = require('../models/request');

async function create(req, res, next) {
    try {
        
        if (!req.body.from || !req.body.details) {
            return res.status(400).json('from and details are required fields');
        }
        const requestData = {
            from: req.body.from,
            details: req.body.details,
            created_by: req.body.created_by
        };

        // start notification
        const warehouse = await shopService.getWarehouse();
        if (warehouse) {
            const notification = await NotificationService.pushNotification("You have new request for order product", warehouse ? warehouse._id : null, req.body.created_by);
        }
        // end 
       
        const request = await RequestService.create(requestData);
        res.status(201).json(request);
    } catch (error) {
        next(error); 
    }
}

async function getAll(req, res, next) {
    try {
        const requests = await RequestService.getAllRequests();
        res.status(200).json(requests);
    } catch (error) {
        next(error); 
    }
}

async function getById(req, res, next) {
    try {
        const request = await RequestService.getById(req.params.id);
        if (!request) 
            res.status(404).json({ message: 'Request not found' });
        res.status(200).json(request);
    } catch (error) {
        next(error); 
    }
}

async function updateInfo(req, res, next) {
    try {
        var request = await Request.findById(req.params.id);
        if(!request) {
            throw new Error('Request not found');
        }

        const requestData = {
            from: req.body.from,
            details: req.body.details
        };

        const updatedRequest = await RequestService.update(req.params.id, requestData);

        res.status(200).json(updatedRequest);
    } catch (error) {
        next(error); 
    }
}

async function updateStatus(req, res, next) {
    try {
        const newStatus = req.body.status;
        const note = req.body.note;

        var request = await Request.findById(req.params.id);
        if(!request) {
            throw new Error('Request not found');
        }
        
        // if (invoice.status === 'completed' || invoice.status===newStatus 
        // || (invoice.status==='cancelled' && newStatus==='completed')) 
        //     throw new Error(`Invoice ${invoice.status} cannot be updated to ${newStatus}`);
            

        // if (invoice.status === 'pending' && newStatus==='completed' && invoice.details && invoice.details.length > 0) {
        //     if(invoice.to !=null && invoice.to != undefined  && invoice.to != "") {
        //         await Promise.all(invoice.details.map(async (detail) =>{
        //             const product = await ShopService.getProById(invoice.to, detail.productId);
        //             if (product) {
        //                 await ShopService.updateProductById(invoice.to, detail.productId, detail.quantity);
        //             } else {
        //                 await ShopService.createOneProduct(invoice.to, {productId: detail.productId, quantity: detail.quantity});
        //             }
        //         }));
        //     }
        // }

        const existingRequest = await RequestService.getById(req.params.id);
        const updatedNote = existingRequest.note + " " + note;
        
        const updatedRequest = await RequestService.updateRequest(req.params.id, {status: newStatus, note: updatedNote});
        res.status(200).json(updatedRequest);
    } catch (error) {
        next(error); 
    }
}

const requestController = {
    create,
    getAll,
    getById,
    updateInfo,
    updateStatus
};

module.exports = requestController;
