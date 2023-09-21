const Joi = require("joi");


const cadastrarUsuarioSchema = Joi.object({
    nome: Joi.string()
    .min(5)
    .max(50)
    .required()
    .messages({
        "any.required": "Campo nome é obrigatório",
        "string.min": "Informe um nome com no mínimo 5 caracteres",
        "string.max": "Informe um nome com no máximo 20 caracteres"
    }),
    avatar: Joi.string()
    .messages({

    }),
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
    email: Joi.string()
    .required()
    .email()
    .required()
    .messages({
        "any.required": "Campo email é obrigatório",
        "string.email": "Informe um email válido"
    }), 
    site: Joi.string()
    .messages({

    }),
    bio: Joi.string()
    .messages({

    }),
    
    telefone: Joi.string()
    .pattern(/^[0-9]+$/, 'phone')
    .messages({

    }),
    genero: Joi.boolean()
    .messages({

    })
})

module.exports = cadastrarUsuarioSchema;