const asyncHandler = require('../utils/async-handle');
const AuthenService = require("../services/authen.service");
const UserService = require("../services/user.service");

module.exports = {
    AuthenLogin: asyncHandler(async (req, res) => {
        const result = await AuthenService.Login(req, res);
        res.status(200).json(result);
    }),

    AddNewUser: asyncHandler(async (req, res) => {
        const result = await UserService.CreateUser(req);
        res.status(200).json(result);
    }),

    ListAllUsers: asyncHandler(async (req, res) => {
        const result = await UserService.ListAllUsers(req);
        res.status(200).json(result);
    }),

    getUserById: asyncHandler(async (req, res) => {
        const result = await UserService.getUserById(req.params.id);
        res.status(200).json(result);
    }),

    updateUserById: asyncHandler(async (req, res) => {
        const result = await UserService.updateUserById(req);
        res.status(200).json(result);
    }),
};