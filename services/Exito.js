const ExitoModel = require('../models/Exito.js');

class ExitoService{
    constructor() {
        this.ExitoModel = new ExitoModel();
        this.collection = 'casoExito';
    }

    async getCasos(limit){
        const casos = await this.ExitoModel.getAll(limit).then(res=>{
            return res;
        })
        return casos;
    }

    async getCaso(id){
        const caso = await this.ExitoModel.getOne(id).then(res=>{
            return res;
        })
        return caso;
    }

    async create(caso,avatar){
        const response = await this.ExitoModel.create(caso,avatar).then(res=>{
            return res;
        })
        return response;
    }

    async update(newCaso,id,avatar){
        const caso = await this.ExitoModel.update(id,newCaso,avatar).then(res=>{
            return res;
        })
        return caso;
    }

    async delete(id){
        const response = await this.ExitoModel.delete(id).then(res=>{
            return res;
        })
        return response;
    }
}

module.exports=ExitoService;