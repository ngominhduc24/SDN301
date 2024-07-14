const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

// Define the Product schema for embedding
const NotificationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;
