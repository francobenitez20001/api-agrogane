const MysqlLib = require('../lib/mysql');

class ArticuloModel{
    constructor(){
        this.db = new MysqlLib();
    }
    getAll(limit){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT idArticulo,titulo,fecha,nombre,imagen,archivo 
                        FROM articulos AS ar, autores AS au
                        WHERE ar.idAutor = au.idAutor 
                        ORDER BY idArticulo DESC LIMIT ${limit}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT idArticulo,titulo,fecha,nombre,imagen,archivo 
                        FROM articulos AS ar, autores AS au
                        WHERE ar.idAutor = au.idAutor AND idArticulo = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(articulo){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARTICULOS_ADD_UPDATE(${articulo.idArticulo},'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${articulo.imagen}','${articulo.archivo}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,articulo){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARTICULOS_ADD_UPDATE(${id},'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${articulo.imagen}','${articulo.archivo}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`CALL SP_ARTICULOS_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ArticuloModel;