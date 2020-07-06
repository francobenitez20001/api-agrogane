const ArticuloModel = require('../models/Articulos.js');

class ArticuloService{
    constructor() {
        this.ArticuloModel = new ArticuloModel();
        this.collection = 'articulos';
    }

    async getArticulos(limit){
        const articulos = await this.ArticuloModel.getAll(limit).then(res=>{
            return res;
        })
        return articulos;
    }

    async getArticulo(id){
        const articulo = await this.ArticuloModel.getOne(id).then(res=>{
            return res;
        })
        return articulo;
    }

    async create(articulo){
        const response = await this.ArticuloModel.create(articulo).then(res=>{
            return res;
        })
        return response;
    }

    async update(newArticulo,id){
        const articulo = await this.ArticuloModel.update(id,newArticulo).then(res=>{
            return res;
        })
        return articulo;
    }

    async delete(id){
        const response = await this.ArticuloModel.delete(id).then(res=>{
            return res;
        })
        return response;
    }
}

module.exports=ArticuloService;