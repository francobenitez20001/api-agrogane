const express = require('express');
const NosotrosService = require('../services/Nosotros.js');
const multer = require('../lib/multer');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../sitios-trabajo-679d5ad729ed.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('agrogane-dev');

function nosotrosApi(app) {
    const router = express.Router();
    app.use("/api/nosotros",router);
    const nosotrosService = new NosotrosService();

    router.get('/',async(req,res,next)=>{
        const Nosotros = await nosotrosService.get();
        res.status(200).json({
            data:Nosotros || [],
            info:'Nosotros Listados correctamente'
        })
    });
    router.post('/',multer.single('header'),async(req,res,next)=>{
        const {body:nosotros} = req;
        const response = await nosotrosService.create(nosotros);
        res.status(200).json({
            data:response,
            info:'Nosotros creado'
        })
    });

    router.put('/:id',multer.single('header'),async(req,res,next)=>{
        const {id:id} = req.params;
        const {body:nosotros} = req;
        try {
            if(!req.file){
                const data = await nosotrosService.update(nosotros,id);
                return res.status(200).json({
                    data:data,
                    info:'Nosotros modificado'
                });
            }
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();
            
            blobStream.on('error', (err) => {
                next(err);
            });
            
            blobStream.on('finish', async() => {
                // The public URL can be used to directly access the file via HTTP.
                const header = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                const data = await nosotrosService.update(nosotros,id,header);
                res.status(200).json({
                    data:data,
                    info:'Nosotros modificado'
                });
            });
            blobStream.end(req.file.buffer);
        } catch (error) {
            next(error);
        }
    })
}

module.exports = nosotrosApi;