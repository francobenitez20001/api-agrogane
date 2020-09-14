const connection = require('../lib/mysql');

class ArticuloModel{
    getAll(limit){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT idArticulo,titulo,fecha,ar.idAutor,nombre,imagen,archivo 
                        FROM articulos AS ar, autores AS au
                        WHERE ar.idAutor = au.idAutor 
                        ORDER BY idArticulo DESC LIMIT ${limit}`,(err,res,fields)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT idArticulo,titulo,fecha,ar.idAutor,nombre,foto,cargo,imagen,archivo,resumen 
                        FROM articulos AS ar, autores AS au
                        WHERE ar.idAutor = au.idAutor AND idArticulo = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(articulo,archivo,imagen){
        return new Promise((resolve,reject)=>{
            let query;
            (!archivo)?query=`CALL SP_ARTICULOS_ADD_UPDATE(0,'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${imagen.filename}','${articulo.archivo}','${articulo.resumen}')`:query=`CALL SP_ARTICULOS_ADD_UPDATE(0,'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${imagen.filename}','${archivo.filename}','${articulo.resumen}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw resolve(err);
                resolve(res);
            })
        })
    }

    update(id,articulo,imagen,archivo){
        return new Promise((resolve,reject)=>{
            let header = imagen ? imagen.filename : imagen;
            let archivoContenido = archivo ? archivo.filename : archivo;
            console.log('archivo de contenido');
            console.log(archivoContenido);
            let query = '';
            (archivo)?query = `CALL SP_ARTICULOS_ADD_UPDATE(${id},'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${header}','${archivoContenido}','${articulo.resumen}')` : query = `CALL SP_ARTICULOS_ADD_UPDATE(${id},'${articulo.titulo}','${articulo.fecha}',${articulo.idAutor},'${header}','${articulo.archivo}','${articulo.resumen}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_ARTICULOS_DELETE(${id})`,(err,res,fiels)=>{
                if(err) reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ArticuloModel;