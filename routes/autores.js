const express = require('express');
const AutorService = require('../services/Autor.js');
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

    router.post('/',async(req,res,next)=>{
        const {body:autor} = req;
        const response = await autorService.create(autor);
        res.status(200).json({
            data:response,
            info:'Autor creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:idAutor} = req.params;
        const {body:newAutor} = req;
        const autor = await autorService.update(newAutor,idAutor);
        res.status(200).json({
            data:autor,
            info:'Autor modificado'
        });
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