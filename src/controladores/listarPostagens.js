const postagens = require("../repositórios/postagemRepositorio");


async function listarPostagens(req, res){
    try {
        const feed = await postagens.listar();
        return res.status(200).json(feed);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = { listarPostagens }