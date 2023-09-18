function exibirUsuario(req, res){
    const {usuario} = req;
    try {
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor"});
    }
}

module.exports = { exibirUsuario };