const knex = require("../connect");


class postagens {
    static async criarPostagem(texto, fotos, idUsuario){
        const postagem = await knex("postagens").insert({texto, usuario_id: idUsuario}).returning("*");
        const [{ id }] = postagem;
        const uploadDeFotos = this.relacionarFotosAPostagem(fotos, id);

        if(!uploadDeFotos){
            await knex("postagem").del().where({id});
            return false;
        }
        return postagem;


    }

    static async relacionarFotosAPostagem(fotos, idPostagem){
        for(const foto of fotos){
            foto.postagem_id = idPostagem
        }
        return await knex("postagem_fotos").insert(fotos).returning("*");
    }
}

module.exports = postagens;