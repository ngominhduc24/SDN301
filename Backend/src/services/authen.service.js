const crypto = require('crypto');
class AuthenService {
    // Authentication login service
    async Login(req, res, next) {
        const { email, password } = req.body;
        try {
            const randomToken = crypto.randomBytes(23).toString('hex');
            const result = { token: randomToken};
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthenService();