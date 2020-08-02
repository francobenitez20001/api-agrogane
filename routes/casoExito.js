const express = require('express');
const ExitoService = require('../services/Exito.js');
const multer = require('../lib/multer');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../agrogane-cloud.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('agrogane-dev');

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

    router.post('/',multer.single('foto'),async(req,res,next)=>{
        const {body:caso} = req;
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();
            
            blobStream.on('error', (err) => {
                next(err);
            });
            
            blobStream.on('finish', async() => {
                // The public URL can be used to directly access the file via HTTP.
                const avatar = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                const response = await exitoService.create(caso,avatar);
                res.status(200).json({
                    data:response,
                    info:'Caso creado'
                })
            });
            blobStream.end(req.file.buffer);
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',multer.single('foto'),async(req,res,next)=>{
        try {
            const {id:idCaso} = req.params;
            const {body:newCaso} = req;
            if(!req.file){
                const caso = await exitoService.update(newCaso,idCaso);
                res.status(200).json({
                    data:caso,
                    info:'Caso modificado'
                });
            }
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();
            
            blobStream.on('error', (err) => {
                next(err);
            });
            
            blobStream.on('finish', async() => {
                // The public URL can be used to directly access the file via HTTP.
                const avatar = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                const response = await exitoService.update(newCaso,idCaso,avatar);
                res.status(200).json({
                    data:response,
                    info:'Caso Modificado'
                })
            });
            blobStream.end(req.file.buffer);
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