const express = require('express');
const ArticuloService = require('../services/Articulos.js');
const upload = require('../lib/multer.js');
const path = require('path');

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

    router.post('/',upload.single('imagen'),async(req,res,next)=>{
        try {
            if(!req.file){
                res.status(400).send('No file');
                return;
            }
            const {body:articulo} = req;
            const {file:imagen} = req;
            const articuloRes = await articuloService.create(articulo,imagen);
            console.log(articuloRes);
            res.status(200).json({
                data:articuloRes,
                info:'Articulo creado'
            });
        } catch (error) {
            next(error);   
        }
    });

    router.put('/:id',upload.single('imagen'),async(req,res,next)=>{
        try {
            const {id:idArticulo} = req.params;
            const {body:newArticulo} = req;
            if(!req.file){
                const articulo = await articuloService.update(newArticulo,idArticulo,null);
                res.status(200).json({
                    data:articulo,
                    info:'Autor modificado'
                });
                return;
            }
            const {file:imagen} = req;
            const articulo = await articuloService.update(newArticulo,idArticulo,imagen.filename);
            res.status(200).json({
                data:articulo,
                info:'Articulo modificado'
            });
        } catch (error) {
            next(error);   
        }
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