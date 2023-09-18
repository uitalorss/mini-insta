const Router = require("express");
const { cadastroUsuarios } = require("../controladores/cadastroUsuario");
const { autenticarUsuario } = require("../intermediários/autenticarUsuario");
const { exibirUsuario } = require("../controladores/exibirUsuario");
const { logarUsuario } = require("../controladores/logarUsuario");
const { fazerPostagem } = require("../controladores/fazerPostagem");

const router = Router();

router.post("/cadastro", cadastroUsuarios);
router.post("/login", logarUsuario);
router.get("/usuario", autenticarUsuario, exibirUsuario);

router.post("/post", autenticarUsuario, fazerPostagem);

module.exports = {router};