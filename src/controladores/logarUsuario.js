const usuarios = require("../repositórios/usuarioRepositório");
const gerarToken = require("../uteis/gerarToken");
const validarSenha = require("../uteis/validarSenha");


async function logarUsuario(req, res){
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({message: "Preencha todos os campos"});
    }
    const usuario = await usuarios.obterUsuarioPeloUsername(username);
    if(!usuario){
        return res.status(400).json({message: "Usuário e/ou senha inválidos"});
    }

    if(!await validarSenha(password, usuario.password)){
        return res.status(400).json({message: "Usuário e/ou senha inválidos"});
    }

    const token = gerarToken(usuario.id);

    const {password: _, ...dadosUsuario} = usuario;
    return res.status(200).json({dadosUsuario, token});
}

module.exports = logarUsuario;