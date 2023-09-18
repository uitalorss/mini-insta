const postagens = require("../repositórios/postagemRepositorio");


async function curtirPostagem(req, res){
    const { idPostagem } = req.params;
    const { id } = req.usuario;

    try {
        const postagem = await postagens.obterPostagemPorId(idPostagem);
        if(!postagem){
            return res.status(404).json({ message: "Postagem não encontrada" });
        }
        const curtir = await postagens.curtir(idPostagem, id);
        if(!curtir){
            return res.status(400).json({ message: "usuário já curtiu essa postagem"});
        }
        return res.status(201).json({ message: "Postagem curtida" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

module.exports = { curtirPostagem }