var userRouter = require('express').Router();
const UserController = require("../controllers/user.controller");
const { validateLogin } = require('../utils/common.validate');

userRouter.post('/auth/login', validateLogin, UserController.AuthenLogin);
userRouter.post('/admin/users', UserController.AddNewUser);

module.exports = userRouter;
