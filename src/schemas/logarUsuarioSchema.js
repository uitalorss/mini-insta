const Joi = require("joi");


const logarUsuarioSchema = Joi.object({
    username: Joi.string()
    .required()
    .min(5)
    .max(20)
    .messages({
        "any.required": "Campo username é obrigatório",
        "string.min": "Informe um username com no mínimo 5 caracteres",
        "string.max": "Informe um username com no máximo 20 caracteres"
    }),
    password: Joi.string()
    .required()
    .messages({
        "any.required": "Campo senha é obrigatório"
    }),
});

module.exports = logarUsuarioSchema;