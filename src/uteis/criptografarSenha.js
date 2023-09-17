const bcrypt = require("bcrypt");

async function criptografarSenha(senha){
    return await bcrypt.hash(senha, 10)
}

module.exports = { criptografarSenha }