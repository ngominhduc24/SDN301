const crypto = require('crypto');
const User = require('../models/user');
const hashPassword = require('../utils/security');
const tokenUtils = require('../utils/jwt-handle');

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
            const access_token = tokenUtils.accessToken({
                id: user._id,
                role: user.role,
              })

            const result = { token: access_token };
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthenService();