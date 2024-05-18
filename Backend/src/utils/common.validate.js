const Joi = require('joi');
const asyncHandler = require('./async-handle');

module.exports = {
    validateMail: asyncHandler(async (req, res, next) => {
        await Joi.object({
            email: Joi.string()
                .email()
                .required(),
        }).validateAsync(req.body, { abortEarly: false });
        next();
    }),
};

