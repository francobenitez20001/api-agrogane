const ContactoModel = require('../models/Contacto.js');

class ContactoService{
    constructor() {
        this.ContactoModel = new ContactoModel();
        this.collection = 'contacto';
    }

    async getContactos(){
        const contacto = await this.ContactoModel.getAll().then(res=>{
            return res;
        })
        return contacto;
    }

    async create(articulo){
        const response = await this.ContactoModel.create(articulo).then(res=>{
            return res;
        })
        return response;
    }

    async update(newContacto,id){
        const contacto = await this.ContactoModel.update(id,newContacto).then(res=>{
            return res;
        })
        return contacto;
    }
}

module.exports=ContactoService;