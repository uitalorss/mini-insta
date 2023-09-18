const usuarios = require("../repositórios/usuarioRepositório");
const { criptografarSenha } = require("../uteis/criptografarSenha");


async function cadastroUsuarios(req, res){
    const {nome, avatar, username, password, email, site, bio, telefone, genero} = req.body;

    if(!nome || !username || !password || !email){
        return res.status(400).json({message: "Preencha os campos obrigatórios."});
    }
    try {
        if(!await usuarios.verificarEmailValido(email)){
            return res.status(400).json({message: "Já existe um usuário com esse email."});
        }

        if(!await usuarios.verificarUsernameValido(username)){
            return res.status(400).json({message: "Já existe um usuário com esse username."});
        }
        const senhaEncriptada = await criptografarSenha(password);
        await usuarios.cadastrarUsuario(nome, avatar, username, senhaEncriptada, email, site, bio, telefone, genero);
        return res.status(201).json({message: "Usuário cadastrado com sucesso"});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Erro interno do servidor"});
    }
}

module.exports = { cadastroUsuarios };