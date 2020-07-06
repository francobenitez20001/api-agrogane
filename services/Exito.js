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

    async create(caso){
        const response = await this.ExitoModel.create(caso).then(res=>{
            return res;
        })
        return response;
    }

    async update(newCaso,id){
        const caso = await this.ExitoModel.update(id,newCaso).then(res=>{
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