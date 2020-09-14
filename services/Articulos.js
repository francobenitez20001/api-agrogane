const ArticuloModel = require('../models/Articulos.js');
class ArticuloService{
    constructor() {
        this.ArticuloModel = new ArticuloModel();
        this.collection = 'articulos';
    }

    async getArticulos(limit){
        const articulos = await this.ArticuloModel.getAll(limit).then(res=>{
            return res;
        }).catch(err=>err);
        return articulos;
    }

    async getArticulo(id){
        const articulo = await this.ArticuloModel.getOne(id).then(res=>{
            return res;
        })
        return articulo;
    }

    async create(articulo,archivo=null,imagen){
        const response = await this.ArticuloModel.create(articulo,archivo,imagen).then(res=>{
            return res;
        }).catch(err=>err);
        return response;
    }

    async update(newArticulo,id,imagen=null,archivo=null){
        const articulo = await this.ArticuloModel.update(id,newArticulo,imagen,archivo).then(res=>{
            return res;
        })
        return articulo;
    }

    async delete(id){
        const response = await this.ArticuloModel.delete(id).then(res=>{
            return res;
        }).catch(err=>err);
        return response;
    }
}

module.exports=ArticuloService;