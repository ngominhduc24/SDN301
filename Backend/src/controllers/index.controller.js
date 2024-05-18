const asyncHandler = require('../utils/async-handle');
const IndexService = require("../services/index.service");

module.exports = {
    test: asyncHandler(async (req, res) => {
        const result = await IndexService.testGet(req, res);
        res.status(200).json(result);
    }),

    testPostMethod: asyncHandler(async (req, res) => {
        const result = await IndexService.test(req, res);
        res.status(200).json(result);
    }),
};