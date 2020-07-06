const express = require('express');
const ArticuloService = require('../services/Articulos.js');
function articulosApi(app) {
    const router = express.Router();
    app.use("/api/articulos",router);
    const articuloService = new ArticuloService();

    router.get('/',async(req,res,next)=>{
        const {limit} = req.query;
        const articulos = await articuloService.getArticulos(limit);
        res.status(200).json({
            data:articulos || [],
            info:'Articulos Listados correctamente'
        })
    });

    router.get('/:id',async(req,res,next)=>{
        const {id:idArticulo} = req.params;
        const articulo = await articuloService.getArticulo(idArticulo);
        res.status(200).json({
            data:articulo || [],
            info:'Articulo listado'
        }) 
    });

    router.post('/',async(req,res,next)=>{
        const {body:articulo} = req;
        const response = await articuloService.create(articulo);
        res.status(200).json({
            data:response,
            info:'Articulo creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:idArticulo} = req.params;
        const {body:newArticulo} = req;
        const articulo = await articuloService.update(newArticulo,idArticulo);
        res.status(200).json({
            data:articulo,
            info:'Articulo modificado'
        });
    })

    router.delete('/:id',async (req,res,next)=>{
        const {id:idArticulo} = req.params;
        const response = await articuloService.delete(idArticulo);
        res.status(200).json({
            data:response,
            info:'Articulo eliminado'
        })
    })
}

module.exports = articulosApi;