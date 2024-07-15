const Notification = require('../models/notification');
const socketSingleton = require('../config/socketSingleton.config');

class NotificationService {
    async pushNotification(content, shopId, createdBy) {
        try {
            const newNotification = new Notification({
                content: content,
                shopId: shopId,
                created_by: createdBy._id,
            });
            const savedNotification = await newNotification.save();

            // Emit the notification event
            const createdAt = savedNotification.createdAt;
            const timeAgo = getTimeAgo(createdAt);

            const notificationDataEmit = {
                title: "Order Request",
                content: content,
                accountName: createdBy.email,
                logo:  createdBy.image,
                timeAgo: timeAgo,
              };
              console.log(notificationDataEmit);
            const io = socketSingleton.getIo();
            io.to(shopId).emit('notification', notificationDataEmit);

            return savedNotification;
        } catch (error) {
            throw error;
        }
    }
}

function getTimeAgo(createdAt) {
    const now = new Date();
    const diffMs = now - new Date(createdAt);
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        return `Just now`;
    }
}

module.exports = new NotificationService();
