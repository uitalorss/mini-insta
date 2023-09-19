const postagens = require("../repositórios/postagemRepositorio");


async function comentarPostagem(req, res){
    const { texto } = req.body;
    const { idPostagem } = req.params;
    const { id } = req.usuario;

    if(texto.trim() === ""){
        return res.status(400).json({ message: "Insira um comentário válido."});
    }

    try {
        const postagem = await postagens.obterPostagemPorId(idPostagem);
        if(!postagem){
            return res.status(404).json({ message: "Postagem não encontrada." });
        }

        const comentario = await postagens.comentar(idPostagem, id, texto);
        if(!comentario){
            return req.status(400).json({message: "Comentário não enviado."})
        }

        return res.status(201).json({ message: "Comentário feito" });
        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

module.exports = { comentarPostagem };