require("dotenv").config();
const jwt = require("jsonwebtoken");
const usuarios = require("../repositórios/usuarioRepositório");

async function autenticarUsuario(req, res, next){
    const{ authorization } = req.headers;

    try {
        if(!authorization || authorization === "Bearer"){
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

        const usuario = await usuarios.obterUsuarioPeloId(id);
        if(!usuario){
            return res.status(401).json({message: "Usuário não autenticado"});
        }
        const {password: _, ...dadosUsuario} = usuario;
        req.usuario = dadosUsuario;
        next();

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = { autenticarUsuario };