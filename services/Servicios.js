const ServiciosModel = require('../models/Servicios.js');

class ServiciosService{
    constructor() {
        this.ServiciosModel = new ServiciosModel();
        this.collection = 'servicios';
    }

    async getAutores(){
        const servicios = await this.ServiciosModel.getAll().then(res=>{
            return res;
        })
        return servicios;
    }

    async getAutor(id){
        const servicio = await this.ServiciosModel.getOne(id).then(res=>{
            return res;
        })
        return servicio;
    }

    async create(servicio){
        const response = await this.ServiciosModel.create(servicio).then(res=>{
            return res;
        })
        return response;
    }

    async update(newServicio,id){
        const servicio = await this.ServiciosModel.update(id,newServicio).then(res=>{
            return res;
        })
        return servicio;
    }

    async delete(id){
        const response = await this.ServiciosModel.delete(id).then(res=>{
            return res;
        })
        return response;
    }
}

module.exports=ServiciosService;