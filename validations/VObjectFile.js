const Joi = require("joi")

const ObjectFileCreateValidation = Joi.object({
    name: Joi.string().required(),
    base64data: Joi.string().required(),
    extention: Joi.string().required(),
}).unknown()

const ObjectFileDeleteValidation = Joi.object({
    id: Joi.string().required(),
}).unknown()

module.exports = { ObjectFileCreateValidation, ObjectFileDeleteValidation }
