const Notification = require('../models/notification');

class NotificationService {
    // Authentication login service
    async pushNotification(content, shopId, createBy) {
        try {
            const newNotification = new Notification({
                content: content,
                shopId: shopId,
                created_by: createBy,
            });
            return await newNotification.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new NotificationService();