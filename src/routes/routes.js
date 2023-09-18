const Router = require("express");
const cadastroUsuarios = require("../controladores/cadastroUsuario");
const logarUsuario = require("../controladores/logarUsuario");

const router = Router();

router.post("/cadastro", cadastroUsuarios);
router.post("/login", logarUsuario);

module.exports = {router};