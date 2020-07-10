const ArticuloModel = require('../models/Articulos.js');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');
const { rejects } = require('assert');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../sitios-trabajo-679d5ad729ed.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('agrogane-dev');

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

    async create(articulo,imagen){
        const response = await this.ArticuloModel.create(articulo,imagen).then(res=>{
            return res;
        })
        return response;
    }

    async update(newArticulo,id,imagen=null){
        const articulo = await this.ArticuloModel.update(id,newArticulo,imagen).then(res=>{
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

    async uploadFile(file){
        return new Promise((resolve,reject)=>{
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on('error', (err) => {
                reject(err)
            });
            
            blobStream.on('finish', async() => {
                resolve(format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                ));
            });
            blobStream.end(file.buffer);
        })
    }
}

module.exports=ArticuloService;