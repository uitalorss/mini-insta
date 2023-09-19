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

    static async obterPostagemPorId(idPostagem){
        const postagem = await knex("postagens").where({id: idPostagem}).first();
        return postagem;
    }

    static async verificarPostagemValida(idPostagem){
        return await knex("postagens").where({id: idPostagem}).first() ? true : false;
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

    static async comentar(idPostagem, idUsuario, comentario){
        return await knex("postagem_comentarios").insert({postagem_id: idPostagem, usuario_id: idUsuario, texto: comentario}).returning("*") ? true : false;
    }

    static async listar(){
        const postagens = await knex("postagens")
        .join("usuarios", "postagens.usuario_id", "usuarios.id")
        .select("postagens.id", "usuarios.avatar", "usuarios.nome", "usuarios.verificado","postagens.texto", "postagens.data");

        for(const postagem of postagens){
            postagem.imagens = await this.agruparFotos(postagem.id);
            postagem.curtidas = await this.contarCurtidas(postagem.id);
            postagem.comentarios = await this.agruparComentarios(postagem.id);
        }
        return postagens;
    }

    static async agruparFotos(idPostagem){
        return await knex("postagem_fotos")
        .join("postagens", "postagem_fotos.postagem_id", "postagens.id")
        .select("imagem")
        .where({"postagem_id": idPostagem});
    }

    static async contarCurtidas(idPostagem){
        const contador =  await knex("postagem_curtidas").count().where({postagem_id: idPostagem});
        const [{ count }] = contador;
        return count;
    }

    static async agruparComentarios(idPostagem){
        return await knex("postagem_comentarios")
        .join("usuarios", "postagem_comentarios.usuario_id", "usuarios.id")
        .select("usuarios.username", "postagem_comentarios.texto")
        .where({postagem_id: idPostagem});
    }
}

module.exports = postagens;