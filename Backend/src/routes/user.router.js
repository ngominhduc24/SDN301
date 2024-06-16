var userRouter = require('express').Router();
const UserController = require("../controllers/user.controller");
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");
const { validateLogin } = require('../utils/common.validate');

userRouter.post('/auth/login', validateLogin, UserController.AuthenLogin);
userRouter.post('/admin/users', UserController.AddNewUser);
userRouter.get('/admin/users', verifyTokenHandle.verifyToken, UserController.ListAllUsers);
userRouter.put('/admin/user/:id', UserController.updateUserById);

module.exports = userRouter;
