const express = require('express');
const ArticuloService = require('../services/Articulos.js');
const multer = require('../lib/multer.js');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../sitios-trabajo-679d5ad729ed.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('agrogane-dev');

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

    router.post('/',multer.single('imagen'),async(req,res,next)=>{
        try {
            if(!req.file){
                res.status(400).send('No file');
                return;
            }
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();
             
            blobStream.on('error', (err) => {
                next(err);
            });
             
            blobStream.on('finish', async() => {
                // The public URL can be used to directly access the file via HTTP.
                const imagen = format(
                   `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                const {body:articulo} = req;
                const articuloRes = await articuloService.create(articulo,imagen);
                console.log(articuloRes);
                res.status(200).json({
                    data:articuloRes,
                    info:'Articulo creado'
                });
            });
            blobStream.end(req.file.buffer);
        } catch (error) {
            next(error);   
        }
    });

    router.put('/:id',multer.single('imagen'),async(req,res,next)=>{
        try {
            const {id:idArticulo} = req.params;
            const {body:newArticulo} = req;
            if(!req.file){
                const articulo = await articuloService.update(newArticulo,idArticulo);
                res.status(200).json({
                    data:articulo,
                    info:'Autor modificado'
                });
                return;
            }
            articuloService.uploadFile(req.file).then(async link=>{
                const imagen = link;
                const articulo = await articuloService.update(newArticulo,idArticulo,imagen);
                res.status(200).json({
                    data:articulo,
                    info:'Articulo modificado'
                });
            }).catch(err=>{
                res.status(400).json({
                    info:err
                });
            })
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