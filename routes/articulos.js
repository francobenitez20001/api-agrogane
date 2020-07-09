const express = require('express');
const ArticuloService = require('../services/Articulos.js');
const multer = require('../lib/multer.js');

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

    router.post('/',multer.fields([
        {name:'imagen'},
        {name:'archivo'}
    ]),async(req,res,next)=>{
        try {
            if(!req.files){
                res.status(400).send('No file');
                return;
            }
            let imagenes = [];
            let keyObjImage = Object.keys(req.files);
            let i = 0;
            while (i < Object.keys(req.files).length) {
                //req.files[Object.keys(req.files)[0]]; -> es cada array con el objeto de la imagen adentro.
                //req.files[ Object.keys(req.files)[0] ][0]->el objeto de la imagen (siempre va ser la posicion 0 porque no trae otra cosas ademas del objeto con las propiedades de la imagen).
                let objImage = req.files[keyObjImage[i]][0];
                imagenes.push(objImage);
                i++;
            }
            articuloService.uploadFile(imagenes[0]).then(link=>{
                const imagen = link;
                articuloService.uploadFile(imagenes[1]).then(async link=>{
                    const archivo = link; 
                    const {body:articulo} = req;
                    const articuloRes = await articuloService.create(articulo,imagen,archivo);
                    res.status(200).json({
                        data:articuloRes,
                        info:'Articulo creado'
                    })
                }).catch(err=>{
                    res.status(400).json({
                        info:err
                    });
                })
            }).catch(err=>{
                res.status(400).json({
                    info:err
                });
            });
            
        } catch (error) {
            next(error);   
        }
    });

    router.put('/:id',multer.fields([
        {name:'imagen'},
        {name:'archivo'}
    ]),async(req,res,next)=>{
        try {
            const {id:idArticulo} = req.params;
            const {body:newArticulo} = req;
            if(Object.keys(req.files).length==0){
                const articulo = await articuloService.update(newArticulo,idArticulo);
                res.status(200).json({
                    data:articulo,
                    info:'Articulo modificado'
                });
                return;
            }
            let imagenes = [];
            let keyObjImage = Object.keys(req.files);
            let i = 0;
            while (i < Object.keys(req.files).length) {
                let objImage = req.files[keyObjImage[i]][0];
                imagenes.push(objImage);
                i++;
            }
            articuloService.uploadFile(imagenes[0]).then(link=>{
                const imagen = link;
                articuloService.uploadFile(imagenes[1]).then(async link=>{
                    const archivo = link; 
                    const {id:idArticulo} = req.params;
                    const {body:newArticulo} = req;
                    const articulo = await articuloService.update(newArticulo,idArticulo,imagen,archivo);
                    res.status(200).json({
                        data:articulo,
                        info:'Articulo modificado'
                    });
                }).catch(err=>{
                    res.status(400).json({
                        info:err
                    });
                })
            }).catch(err=>{
                res.status(400).json({
                    info:err
                });
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