const express = require('express');
const AutorService = require('../services/Autor.js');
const upload = require('../lib/multer.js');

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

    router.post('/',upload.single('foto'),async(req,res,next)=>{
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const {body:autor} = req;
            const {file:avatar} = req;
            const response = await autorService.create(autor,avatar.filename);
            res.status(200).json({
                data:response,
                info:'Autor creado'
            })
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id',upload.single('foto'),async(req,res,next)=>{
        try {
            const {id:idAutor} = req.params;
            const {body:newAutor} = req;
            if(!req.file){
                const autor = await autorService.update(newAutor,idAutor,null);
                return res.status(200).json({
                    data:autor,
                    info:'Autor modificado'
                });
            }
            const {file:avatar} = req;
            const autor = await autorService.update(newAutor,idAutor,avatar.filename);
            res.status(200).json({
                data:autor,
                info:'Autor modificado'
            });
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