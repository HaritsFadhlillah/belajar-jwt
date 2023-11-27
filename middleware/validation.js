const Joi = require('@hapi/joi')
  
  // Validasi form
const validation = data =>{
    const scheme = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required()
    })
    return scheme.validate(data)
}

module.exports.validation = validation
