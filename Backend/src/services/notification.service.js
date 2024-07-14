const Notification = require('../models/notification');

class NotificationService {
    constructor(io) {
        this.io = io;
    }

    async pushNotification(content, shopId, createBy) {
        try {
            const newNotification = new Notification({
                content: content,
                shopId: shopId,
                created_by: createBy,
            });
            const savedNotification = await newNotification.save();

            // Emit the notification event
            this.io.to(shopId).emit('notification', savedNotification);

            return savedNotification;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new NotificationService();