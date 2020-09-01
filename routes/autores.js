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

    router.post('/',upload.fields([{
            name: 'foto', maxCount: 1
        }, {
            name: 'cv', maxCount: 1
        }]),async(req,res,next)=>{
        try {
            if (!req.files) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const {body:autor} = req;
            let cv = null;
            let foto = req.files.foto[0].filename;
            if(req.files.cv){
                cv = req.files.cv[0].filename;
            }
            const response = await autorService.create(autor,foto,cv);
            res.status(200).json({
                data:response,
                info:'Autor Insertado'
            })
        } catch (error) {
            next(error);
        }
    });

    router.put('/:id',upload.fields([{
            name: 'foto', maxCount: 1
        }, {
            name: 'cv', maxCount: 1
        }]),async(req,res,next)=>{
        try {
            const {id:idAutor} = req.params;
            const {body:newAutor} = req;
            if(!req.files){
                console.log('actualizando sin fotos');
                const autor = await autorService.update(newAutor,idAutor);
                return res.status(200).json({
                    data:autor,
                    info:'Autor modificado'
                });
            }
            let cv = null;
            let foto = null;
            if(req.files.cv){
                console.log('actualizando con cv');
                cv = req.files.cv[0].filename;
            }
            if(req.files.foto){
                console.log('actualizando con foto');
                foto = req.files.foto[0].filename;
            }
            const autor = await autorService.update(newAutor,idAutor,foto,cv);
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