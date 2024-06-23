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
    validateLogin: asyncHandler(async (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(3) // min 3 characters required to develop
        });
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    }),
};

