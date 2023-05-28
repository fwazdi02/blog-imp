const Joi = require("joi")

const PostCreateValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
}).unknown()

const PostDeleteValidation = Joi.object({
    id: Joi.string().required(),
}).unknown()

module.exports = { PostCreateValidation, PostDeleteValidation }
