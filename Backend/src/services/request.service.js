const Request = require('../models/request');

class RequestService {
    async create(data) {
        try {
            const newRequest = new Request(data);
            return await newRequest.save();
        } catch (error) {
            throw error; 
        }
    }

    async getAllRequests() {
        try {
            return await Request.find().populate({path: 'from', select: '_id name' })
            .populate('details.productId', '_id name description').populate('created_by', '_id');
        } catch (error) {
            throw error; 
        }
    }

    async getById(id) {
        try {
            return await Request.findById(id).populate({path: 'from', select: '_id name' })
            .populate('details.productId', '_id name description').populate('created_by', '_id');
        } catch (error) {
            throw error; 
        }
    }

    async updateRequest(id, data) {
        try {
            return await Request.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        } catch (error) {
            throw error; 
        }
    }

    async update(requestId, updateData) {
        try {
            const request = await Request.findById(requestId);
            if (!request) {
                throw new Error('Request not found');
            }

            updateData.details.forEach(updateDetail => {
                const detail = request.details.find(item => item.productId.toString() === updateDetail.productId);
                if (detail) {
                    detail.updateQuantity = updateDetail.updateQuantity;
                }
            });

            const updatedRequest = await request.save();
            return updatedRequest;
        } catch (error) {
            throw error; 
        }
    }
    
}

module.exports = new RequestService();