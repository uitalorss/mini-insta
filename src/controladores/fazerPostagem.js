const postagens = require("../repositórios/postagemRepositorio");


async function fazerPostagem(req, res){
    const { id } = req.usuario;
    const { texto, fotos } = req.body;

    if(fotos.length === 0){
        return res.status(400).json({message: "Necessário colocar pelo menos uma foto na postagem"});
    }

    try {
        const postagem = await postagens.criarPostagem(texto, fotos, id);
        if(!postagem){
            return res.status(400).json({message: "Erro na postagem"});
        }
        return res.status(201).json(postagem);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = { fazerPostagem }
