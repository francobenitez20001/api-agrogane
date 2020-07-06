const express = require('express');
function casoExitoApi(app) {
    const router = express.Router();
    app.use("/api/caso-exito",router);

    router.get('/',(req,res,next)=>{
        res.send('Servidor Funcionando');
    })
}

module.exports = casoExitoApi;