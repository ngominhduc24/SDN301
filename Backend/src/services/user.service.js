const crypto = require('crypto');
class UserService {
    // Authentication login service
    async CreateUser(req) {
        const { fullname, email, password, dob, phone, status, role } = req.body;
        try {
            const userData = { 
                fullname: fullname,
                email: email,
                password: 123,
                dob: dob,
                phone: phone,
                status: status,
                role: role
            };
            return userData
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();