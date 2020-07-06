const express = require('express');
const NosotrosService = require('../services/Nosotros.js');
function nosotrosApi(app) {
    const router = express.Router();
    app.use("/api/nosotros",router);
    const nosotrosService = new NosotrosService();

    router.get('/',async(req,res,next)=>{
        const Nosotros = await nosotrosService.get();
        res.status(200).json({
            data:Nosotros || [],
            info:'Nosotros Listados correctamente'
        })
    });
    router.post('/',async(req,res,next)=>{
        const {body:nosotros} = req;
        const response = await nosotrosService.create(nosotros);
        res.status(200).json({
            data:response,
            info:'Nosotros creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:id} = req.params;
        const {body:nosotros} = req;
        const data = await nosotrosService.update(nosotros,id);
        res.status(200).json({
            data:data,
            info:'Nosotros modificado'
        });
    })
}

module.exports = nosotrosApi;