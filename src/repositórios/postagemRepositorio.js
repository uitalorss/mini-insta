const knex = require("../connect");
const usuarios = require("./usuarioRepositório");


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

    static async obterPostagemPorId(idPostagem){
        const postagem = await knex("postagens").where({id: idPostagem}).first();
        return postagem;
    }

    static async verificarSeUsuarioJaCurtiu(idPostagem, idUsuario){
        return await knex("postagem_curtidas").where({postagem_id: idPostagem}).andWhere({usuario_id: idUsuario});
        
    }

    static async curtir(idPostagem, idUsuario){
        const curtidasDeUsuario = await this.verificarSeUsuarioJaCurtiu(idPostagem, idUsuario);
        if(curtidasDeUsuario.length > 0){
            return false;
        }
        return await knex("postagem_curtidas").insert({postagem_id: idPostagem, usuario_id: idUsuario});
    }

    static async comentarPostagem(idPostagem, idUsuario, comentario){
        return await knex("postagem_comentarios").insert({postagem_id: idPostagem, usuario_id: idUsuario, texto: comentario});
    }
}

module.exports = postagens;