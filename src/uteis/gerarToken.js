require("dotenv").config();
const jwt = require("jsonwebtoken");

function gerarToken(id){
    return jwt.sign({id}, process.env.JWT_PASSWORD, {expiresIn: "15m"});
}

module.exports = gerarToken;