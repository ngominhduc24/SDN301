var userRouter = require('express').Router();
const UserController = require("../controllers/user.controller");
const { validateLogin } = require('../utils/common.validate');

userRouter.post('/auth/login', validateLogin, UserController.AuthenLogin);
userRouter.post('/admin/users', UserController.AddNewUser);
userRouter.get('/admin/users', UserController.ListAllUsers);
userRouter.put('/admin/user/:id', UserController.updateUserById);

module.exports = userRouter;
