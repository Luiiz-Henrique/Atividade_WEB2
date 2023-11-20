require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();



const url = "https://mauricio.inf.br/p6/api/add.php";

router.post('/', (req, res, next) => { 
    try{
        const token = req.headers['authorization'];

        const {placa, marca, modelo, ano_fabric, cor} = req.body

        const response = axios.post(url, {
            placa: placa,
            marca: marca,
            modelo: modelo,
            ano_de_fabricação: ano_fabric,
            cor: cor
        }, {
            headers: {
                Authorization: "Bearer ${token}"
            }
        });

        const novoDado = response.data;

        res.json({carro_adicionado: novoDado});
    }
    catch (error) {
        console.error("Erro ao receber dados!", error.message);
        res.status(500).json({message: "erro interno no servidor!"});
    };
});

module.exports = router;