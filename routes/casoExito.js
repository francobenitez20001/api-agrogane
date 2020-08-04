const express = require('express');
const ExitoService = require('../services/Exito.js');
const upload = require('../lib/multer');

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

    router.post('/',upload.single('foto'),async(req,res,next)=>{
        const {body:caso} = req;
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const {file:avatar} = req;
            const response = await exitoService.create(caso,avatar);
            res.status(200).json({
                data:response,
                info:'Caso creado'
            })
            
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',upload.single('foto'),async(req,res,next)=>{
        try {
            const {id:idCaso} = req.params;
            const {body:newCaso} = req;
            if(!req.file){
                const caso = await exitoService.update(newCaso,idCaso,null);
                return res.status(200).json({
                    data:caso,
                    info:'Caso modificado'
                });
            }
            const {file:foto} = req;
            const response = await exitoService.update(newCaso,idCaso,foto.filename);
            res.status(200).json({
                data:response,
                info:'Caso Modificado'
            })
        } catch (error) {
            next(error);
        }
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