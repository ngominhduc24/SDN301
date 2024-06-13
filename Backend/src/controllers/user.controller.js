const asyncHandler = require('../utils/async-handle');
const AuthenService = require("../services/authen.service");

module.exports = {
    AuthenLoginMethod: asyncHandler(async (req, res) => {
        const result = await AuthenService.Login(req, res);
        res.status(200).json(result);
    }),
};