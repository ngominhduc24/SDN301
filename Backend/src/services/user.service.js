const User = require('../models/user');
const Shop = require('../models/shop');
const hashPassword = require('../utils/security');

class UserService {
    // Authentication login service
    async CreateUser(req) {
        const { fullname, email, password, dob, phone, status, role, manager} = req.body;
        try {
            const hashedPassword = hashPassword(password);
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                dob: dob,
                phone: phone,
                status: status,
                role: role,
                createBy: manager
              });
              const userData = await user.save();
            return userData;
        } catch (error) {
            throw error;
        }
    }

    // add new staff for manager
    async CreateStaff(req) {
        const { fullname, email, password, dob, phone, status, violation, salary, manager } = req.body;
        try {
            const hashedPassword = hashPassword(password);
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                dob: dob,
                phone: phone,
                status: status,
                salary: salary,
                violation: violation,
                createBy: manager,
                role: "STAFF"
              });
              const userData = await user.save();
            return userData;
        } catch (error) {
            throw error;
        }
    }

    async ListAllUsers(req, res, next) {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getUserStaffByManagerId(id) {
        try {
            return await User.find({createBy: id});
        } catch (error) {
            throw error;
        }
    }

    async getUserShopByManagerId(id) {
        try {
            return await Shop.find({manager: id});
        } catch (error) {
            throw error;
        }
    }

    async updateUserById(req, res, next) {
        try {
            const userId = req.params.id;
            var userUpdate =  {
                fullname: req.body.fullname,
                email: req.body.email,
                dob: req.body.dob,
                phone: req.body.phone,
                status: req.body.status,
                role: req.body.role
            }
            if(req.body.password) {
                userUpdate.password = hashPassword(req.body.password);
            }
            if(req.body.image) {
                userUpdate.image = req.body.image;
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
               userUpdate,
                { new: true } // Return the updated document
            );
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();