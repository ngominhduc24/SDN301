var userRouter = require('express').Router();
const UserController = require("../controllers/user.controller");
const { validateLogin } = require('../utils/common.validate');

userRouter.post('/auth/login', validateLogin, UserController.AuthenLoginMethod);

module.exports = userRouter;
