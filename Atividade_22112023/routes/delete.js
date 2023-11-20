require("dotenv-safe").config();
var express = require('express');
var router = express.Router();

const url = "https://mauricio.inf.br/p6/api/del.php";

router.delete('/', (req, res, next) => { 
    try{
        const token = req.headers['authorization'];

        const placa = req.params.placa

        const response = axios.delete(url, {
            headers: {
                Authorization: 'Bearer ${token}'
            }
        });

        const mensagem = response.data;

        res.json({mensagem: mensagem});
    }
    catch (error) {
        console.error("Erro ao receber dados!", error.message);
        res.status(500).json({message: "erro interno no servidor!"});
    };
});

module.exports = router;