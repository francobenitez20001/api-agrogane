const express = require('express');
const ServiciosService = require('../services/Servicios.js');
function serviciosApi(app) {
    const router = express.Router();
    app.use("/api/servicios",router);
    const serviciosService = new ServiciosService();

    router.get('/',async(req,res,next)=>{
        const servicios = await serviciosService.getAutores();
        res.status(200).json({
            data:servicios || [],
            info:'Servicios Listados correctamente'
        })
    });

    router.get('/:id',async(req,res,next)=>{
        const {id:idServicio} = req.params;
        const servicio = await serviciosService.getAutor(idServicio);
        res.status(200).json({
            data:servicio || [],
            info:'Servicio listado'
        }) 
    });

    router.post('/',async(req,res,next)=>{
        const {body:servicio} = req;
        const response = await serviciosService.create(servicio);
        res.status(200).json({
            data:response,
            info:'Servicio creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:idServicio} = req.params;
        const {body:newServicio} = req;
        const servicio = await serviciosService.update(newServicio,idServicio);
        res.status(200).json({
            data:servicio,
            info:'Servicio modificado'
        });
    })

    router.delete('/:id',async (req,res,next)=>{
        const {id:idServicio} = req.params;
        const response = await serviciosService.delete(idServicio);
        res.status(200).json({
            data:response,
            info:'Servicio eliminado'
        })
    })
}

module.exports = serviciosApi;