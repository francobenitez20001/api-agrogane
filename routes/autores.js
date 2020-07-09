const express = require('express');
const AutorService = require('../services/Autor.js');
const multer = require('../lib/multer.js');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../sitios-trabajo-679d5ad729ed.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('agrogane-dev');


function autorApi(app) {
    const router = express.Router();
    app.use("/api/autor",router);
    const autorService = new AutorService();

    router.get('/',async(req,res,next)=>{
        const autores = await autorService.getAutores();
        res.status(200).json({
            data:autores || [],
            info:'Autores Listados correctamente'
        })
    });

    router.get('/:id',async(req,res,next)=>{
        const {id:idAutor} = req.params;
        const autor = await autorService.getAutor(idAutor);
        res.status(200).json({
            data:autor || [],
            info:'Autor listado'
        }) 
    });

    router.post('/',multer.single('foto'),async(req,res,next)=>{
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
                console.log(avatar);
                
                const {body:autor} = req;
                const response = await autorService.create(autor,avatar);
                res.status(200).json({
                    data:response,
                    info:'Autor creado'
                })
            });
            blobStream.end(req.file.buffer);
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id',multer.single('foto'),async(req,res,next)=>{
        try {
            const {id:idAutor} = req.params;
            const {body:newAutor} = req;
            if(!req.file){
                const autor = await autorService.update(newAutor,idAutor);
                res.status(200).json({
                    data:autor,
                    info:'Autor modificado'
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
                const autor = await autorService.update(newAutor,idAutor,avatar);
                res.status(200).json({
                    data:autor,
                    info:'Autor modificado'
                });
            });
            blobStream.end(req.file.buffer);
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:id',async (req,res,next)=>{
        const {id:idAutor} = req.params;
        const response = await autorService.delete(idAutor);
        res.status(200).json({
            data:response,
            info:'Autor eliminado'
        })
    })
}

module.exports = autorApi;