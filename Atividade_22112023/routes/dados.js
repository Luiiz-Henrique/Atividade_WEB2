require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();



const url = "https://mauricio.inf.br/p6/api/list.php";

router.get('/', (req, res, next) => { 
    try{
        const token = req.headers['authorization'];

        const response = axios.get(url, {
            headers: {
                authorization: 'Bearer ${token}'
            }
        });

        const dados = response.data;

        res.json({dados: dados});
    }
    catch (error) {
        console.error("Erro ao receber dados!", error.message);
        res.status(500).json({message: "erro interno no servidor!"});
    };
});

module.exports = router;