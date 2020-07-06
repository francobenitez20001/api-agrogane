const express = require('express');
const ExitoService = require('../services/Exito.js');
function casoExitoApi(app) {
    const router = express.Router();
    app.use("/api/caso-exito",router);
    const exitoService = new ExitoService();

    router.get('/',async(req,res,next)=>{
        const {limit} = req.query;
        const casos = await exitoService.getCasos(limit);
        res.status(200).json({
            data:casos || [],
            info:'Casos Listados correctamente'
        })
    });

    router.get('/:id',async(req,res,next)=>{
        const {id:idCaso} = req.params;
        const casos = await exitoService.getCaso(idCaso);
        res.status(200).json({
            data:casos || [],
            info:'Caso listado'
        }) 
    });

    router.post('/',async(req,res,next)=>{
        const {body:caso} = req;
        const response = await exitoService.create(caso);
        res.status(200).json({
            data:response,
            info:'Caso creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:idCaso} = req.params;
        const {body:newCaso} = req;
        const caso = await exitoService.update(newCaso,idCaso);
        res.status(200).json({
            data:caso,
            info:'Caso modificado'
        });
    })

    router.delete('/:id',async (req,res,next)=>{
        const {id:idCaso} = req.params;
        const response = await exitoService.delete(idCaso);
        res.status(200).json({
            data:response,
            info:'Caso eliminado'
        })
    })
}

module.exports = casoExitoApi;