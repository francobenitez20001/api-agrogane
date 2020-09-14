const express = require('express');
const ArticuloService = require('../services/Articulos.js');
const upload = require('../lib/multer.js');
const path = require('path');

function articulosApi(app) {
    const router = express.Router();
    app.use("/api/articulos",router);
    const articuloService = new ArticuloService();
    console.log(articuloService);
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

    router.post('/',upload.fields([
        {name:'imagen',maxCount:1},
        {name:'archivo',maxCount:1}
    ]),async(req,res,next)=>{
        try {
            if(!req.files){
                res.status(400).send('No file');
                return;
            }
            if(!req.files.archivo){
                const {body:articulo} = req;
                const imagen = req.files.imagen[0];
                const articuloRes = await articuloService.create(articulo,'',imagen);
                return res.status(200).json({
                    data:articuloRes,
                    info:'Articulo creado'
                });
            }else{
                let imagen = '';
                let archivo = req.files.archivo[0];
                if(req.files.imagen !== undefined){
                    imagen = req.files.imagen[0];
                }
                const {body:articulo} = req;
                const articuloRes = await articuloService.create(articulo,archivo,imagen);
                return res.status(200).json({
                    data:articuloRes,
                    info:'Articulo creado'
                });
            }
        } catch (error) {
            next(error);   
        }
    });

    router.put('/:id',upload.fields([
        {name:'imagen',maxCount:1},
        {name:'archivo',maxCount:1}
    ]),async(req,res,next)=>{
        try {
            console.log('archivos:');
            console.log(req.files);
            const {id:idArticulo} = req.params;
            const {body:newArticulo} = req;
            let imagen = null;
            let archivo = null;
            if(req.files.imagen){
                imagen = req.files.imagen[0];
            }
            if(req.files.archivo && req.files.archivo !== undefined){
                archivo = req.files.archivo[0];
            } 
            const articulo = await articuloService.update(newArticulo,idArticulo,imagen,archivo);
            return res.status(200).json({
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
        console.log(response);
        res.status(200).json({
            data:response,
            info:'Articulo eliminado'
        })
    })
}

module.exports = articulosApi;