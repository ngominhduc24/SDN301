const asyncHandler = require('../utils/async-handle');
const AuthenService = require("../services/authen.service");
const UserService = require("../services/user.service");

module.exports = {
    AuthenLogin: asyncHandler(async (req, res) => {
        const result = await AuthenService.Login(req, res);
        res.status(200).json(result);
    }),

    AddNewUser: asyncHandler(async (req, res) => {
        const managerId = req.user.payload.id;
        const manager = await UserService.getUserById(managerId);
        if (req.body.manager) {
            return res.status(401).json({
                message: "Error! You need to login with admin role.",
            });
        }
        req.body.manager = manager;
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

    // MANAGER ROLE
    AddNewStaff: asyncHandler(async (req, res) => {
        const managerId = req.user.payload.id;
        const manager = await UserService.getUserById(managerId);
        if (req.body.manager) {
            return res.status(401).json({
                message: "Error! You need to login with manager role.",
            });
        }
        req.body.manager = manager;
        const result = await UserService.CreateStaff(req);
        res.status(200).json(result);
    }),

    getListStaff: asyncHandler(async (req, res) => {
        const managerId = req.user.payload.id;
        if (!managerId) {
            return res.status(401).json({
                message: "Error! You need to login with manager role.",
            });
        }
        const result = await UserService.getUserStaffByManagerId(managerId);
        res.status(200).json(result);
    }),

    getListShopForManager: asyncHandler(async (req, res) => {
        const managerId = req.user.payload.id;
        if (!managerId) {
            return res.status(401).json({
                message: "Error! You need to login with manager role.",
            });
        }
        const result = await UserService.getUserShopByManagerId(managerId);
        res.status(200).json(result);
    }),
};