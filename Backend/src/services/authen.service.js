const crypto = require('crypto');
const User = require('../models/user');
const hashPassword = require('../utils/security');
class AuthenService {
    // Authentication login service
    async Login(req, res) {
        const { email, password } = req.body;
        try {
            const hashedPassword = hashPassword(password);
            // Find the user by email
            const user = await User.findOne({ email: email, password: hashedPassword });
            
            if (!user) {
                throw new Error('Email or password is incorrect');
            }

            // Generate a random token
            const randomToken = crypto.randomBytes(23).toString('hex');

            const result = { token: randomToken };
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthenService();