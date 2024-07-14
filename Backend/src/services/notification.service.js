const Notification = require('../models/notification');
const socketSingleton = require('../config/socketSingleton.config');

class NotificationService {
    async pushNotification(content, shopId, createdBy) {
        try {
            const newNotification = new Notification({
                content: content,
                shopId: shopId,
                created_by: createdBy,
            });
            const savedNotification = await newNotification.save();

            // Emit the notification event
            const io = socketSingleton.getIo();
            io.to(shopId).emit('notification', content);

            return savedNotification;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new NotificationService();
