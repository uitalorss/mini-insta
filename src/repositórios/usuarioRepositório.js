const knex = require("../connect");

class usuarios {

    static async verificarEmailValido(email){
       return await knex("usuarios").where({email: email}).first() ? false : true;
    }

    static async verificarUsernameValido(username){
        return await knex("usuarios").where({username: username}).first() ? false : true;
    }

    static async obterUsuarioPeloUsername(username){
        return await knex("usuarios").where({username: username}).first();
    }

    static async obterUsuarioPeloId(id){
        return await knex("usuarios").where({id: id}).first();
    }

    static async cadastrarUsuario(nome, avatar, username, password, email, site, bio, telefone, genero){
        return await knex("usuarios").insert({
            nome,
            avatar,
            username,
            password,
            email,
            site,
            bio,
            telefone,
            genero
        });
    }
}

module.exports = usuarios;