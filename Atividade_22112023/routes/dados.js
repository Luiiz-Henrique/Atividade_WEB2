const axios = require('axios');
var express = require('express');
var router = express.Router();



const url = "https://mauricio.inf.br/p6/api/list.php";

router.get('/', async (req, res, next) => { 
    try{
        const token = req.headers['Authorization'];
        console.log('Bearer ${token}')

        await axios.get(url, {
            Headers: {
                Authorization: "Bearer ${token}"
            }
        })
        .then(dadoss => {
            console.log("OLAAAAAA")
            res.json({dados: dadoss.data});
        })
        .catch(function (error) {
            res.status(401).json({ message: "Credenciais inválidas" });
        });
    }
    catch (error) {
        console.error("Erro ao receber dados!", error.message);
        res.status(500).json({message: "erro interno no servidor!"});
    };
});

module.exports = router;