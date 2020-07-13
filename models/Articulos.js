const connection = require('../lib/mysql2');

class ArticuloModel{
    getAll(limit){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT idArticulo,titulo,fecha,ar.idAutor,nombre,imagen,archivo 
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
            connection.query(`SELECT idArticulo,titulo,fecha,ar.idAutor,nombre,imagen,archivo 
                        FROM articulos AS ar, autores AS au
                        WHERE ar.idAutor = au.idAutor AND idArticulo = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(articulo,imagen){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARTICULOS_ADD_UPDATE(0,'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${imagen}','${articulo.archivo}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,articulo,imagen){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARTICULOS_ADD_UPDATE(${id},'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${imagen}','${articulo.archivo}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_ARTICULOS_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ArticuloModel;