const express = require('express');
const ContactoService = require('../services/Contacto.js');
function contactoApi(app) {
    const router = express.Router();
    app.use("/api/contacto",router);
    const contactoService = new ContactoService();

    router.get('/',async(req,res,next)=>{
        const contacto = await contactoService.getContactos();
        res.status(200).json({
            data:contacto || [],
            info:'Contactos Listados correctamente'
        })
    });
    router.post('/',async(req,res,next)=>{
        const {body:contacto} = req;
        const response = await contactoService.create(contacto);
        res.status(200).json({
            data:response,
            info:'Contacto creado'
        })
    });

    router.put('/:id',async(req,res,next)=>{
        const {id:idContacto} = req.params;
        const {body:newContacto} = req;
        const contacto = await contactoService.update(newContacto,idContacto);
        res.status(200).json({
            data:contacto,
            info:'Contacto modificado'
        });
    })
}

module.exports = contactoApi;