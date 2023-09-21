const Router = require("express");
const { cadastroUsuarios } = require("../controladores/cadastroUsuario");
const { autenticarUsuario } = require("../intermediários/autenticarUsuario");
const { exibirUsuario } = require("../controladores/exibirUsuario");
const { logarUsuario } = require("../controladores/logarUsuario");
const { fazerPostagem } = require("../controladores/fazerPostagem");
const { curtirPostagem } = require("../controladores/curtirPostagem");
const { comentarPostagem } = require("../controladores/comentarPostagem");
const { listarPostagens } = require("../controladores/listarPostagens");
const cadastrarUsuarioSchema = require("../schemas/cadastrarUsuarioSchema");
const validarRequisicao = require("../intermediários/validarRequisicao");
const logarUsuarioSchema = require("../schemas/logarUsuarioSchema");

const router = Router();

router.post("/cadastro", validarRequisicao(cadastrarUsuarioSchema), cadastroUsuarios);
router.post("/login", validarRequisicao(logarUsuarioSchema) ,logarUsuario);
router.get("/usuario", autenticarUsuario, exibirUsuario);

router.post("/post", autenticarUsuario, fazerPostagem);
router.post("/curtir/:idPostagem", autenticarUsuario, curtirPostagem);
router.post("/comentar/:idPostagem", autenticarUsuario, comentarPostagem);
router.get("/feed", autenticarUsuario, listarPostagens);

module.exports = {router};