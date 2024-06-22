const User = require("../models/user");
const {hashPassword, hashChangePassword, hashPassword} = require("../utils/security");
const bcrypt = require("bcryptjs");

class UserService {
  // Authentication login service
  async CreateUser(req) {
    const { fullname, email, password, dob, phone, status, role } = req.body;
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

  async changePassword(req, res, next) {
    const { Password, NewPassword, ReNewPassword } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }
      // const comparedPass = await bcrypt.compare(Password, user.password);
      // if (!comparedPass) {
      //   throw new Error("Old pass not found");
      // }
      // if (NewPassword !== ReNewPassword) {
      //   throw new Error("NewPassword not equal ReNewPassword");
      // }
      // const hashPassword = hashPassword(NewPassword);
      // user.password = hashPassword;
      // await user.save();
      // res.send("success");
      if(!hashChangePassword(Password, user.password)){
        throw new Error("Incorrect password");
      }
      if(NewPassword !== ReNewPassword){
        throw new Error("NewPassword not equal ReNewPassword");
      }
      const hashPassword = NewPassword;
      if(NewPassword){
        hashPassword = hashPassword(NewPassword);
      }
      await user.save();
    } catch (error) {}
  }

  async updateUserById(req, res, next) {
    const userId = req.params.id;
    const { fullname, email, password, dob, phone, status, role } = req.body;
    try {
      var hashedPassword = password;
      if (password) {
        hashedPassword = hashPassword(password);
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          fullname: fullname,
          email: email,
          password: hashedPassword,
          dob: dob,
          phone: phone,
          status: status,
          role: role,
        },
        { new: true } // Return the updated document
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
