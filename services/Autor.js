const AutorModel = require('../models/Autor.js');

class ArticuloService{
    constructor() {
        this.AutorModel = new AutorModel();
        this.collection = 'autores';
    }

    async getAutores(){
        const autores = await this.AutorModel.getAll().then(res=>{
            return res;
        })
        return autores;
    }

    async getAutor(id){
        const autor = await this.AutorModel.getOne(id).then(res=>{
            return res;
        })
        return autor;
    }

    async create(autor,avatar,cv=null){
        const response = await this.AutorModel.create(autor,avatar,cv).then(res=>{
            return res;
        }).catch(err=>{
            return err;
        })
        return response;
    }

    async update(newAutor,id,avatar=null,cv=null){
        const autor = await this.AutorModel.update(id,newAutor,avatar,cv).then(res=>{
            return res;
        }).catch(err=>{
            return err;
        })
        return autor;
    }

    async delete(id){
        const response = await this.AutorModel.delete(id).then(res=>{
            return res;
        })
        return response;
    }
}

module.exports=ArticuloService;