require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();
const axios = require('axios');

router.post("/", async (req, res, next) => {
    try {
        const { username, senha } = req.body;

        // Realize a solicitação POST para o serviço de autenticação
        const response = await axios.post('https://www.mauricio.inf.br/p6/api/authenticate.php', {
            username: username,
            senha: senha
        });

        // Verifique a resposta do serviço de autenticação
        if (response.data.auth === true) {
            const token = response.data.token; // Assumindo que o token está na propriedade 'token' da resposta

            // Retorne o token na resposta JSON
            return res.json({ auth: true, token: token });
        } else {
            // Se a autenticação falhar, retorne uma resposta de credenciais inválidas
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error.message);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
});

module.exports = router;