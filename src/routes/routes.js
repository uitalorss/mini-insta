const Router = require("express");
const cadastroUsuarios = require("../controladores/cadastroUsuario");

const router = Router();

router.post("/cadastro", cadastroUsuarios);

module.exports = {router};