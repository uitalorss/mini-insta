const bcrypt = require("bcrypt");

async function validarSenha(senha, senhaEncriptada){
    return await bcrypt.compare(senha, senhaEncriptada)
}

module.exports = validarSenha;