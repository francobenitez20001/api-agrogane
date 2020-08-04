const express = require('express');
const NosotrosService = require('../services/Nosotros.js');
const upload = require('../lib/multer');

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
    router.post('/',upload.single('header'),async(req,res,next)=>{
        const {body:nosotros} = req;
        const response = await nosotrosService.create(nosotros);
        res.status(200).json({
            data:response,
            info:'Nosotros creado'
        })
    });

    router.put('/:id',upload.single('header'),async(req,res,next)=>{
        const {id:id} = req.params;
        const {body:nosotros} = req;
        try {
            if(!req.file){
                const data = await nosotrosService.update(nosotros,id,null);
                return res.status(200).json({
                    data:data,
                    info:'Nosotros modificado'
                });
            }
            const {file:header} = req;
            const data = await nosotrosService.update(nosotros,id,header.filename);
            res.status(200).json({
                data:data,
                info:'Nosotros modificado'
            });
        } catch (error) {
            next(error);
        }
    })
}

module.exports = nosotrosApi;