const connection = require('../lib/mysql');

class AutorModel{
    
    getAll(){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM autores WHERE habilitado = 1 ORDER BY idAutor ASC`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM autores WHERE idAutor = ${id} AND habilitado = 1`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(autor,avatar,cv){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_AUTORES_ADD_UPDATE(0,'${autor.nombre}','${autor.cargo}','${autor.descripcion}','${autor.tituloProfesional}', '${autor.testimonio}','${avatar}','${cv}');`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw resolve(err);
                resolve(res);
            })
        })
    }

    update(id,autor,avatar,cv){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_AUTORES_ADD_UPDATE(${id},'${autor.nombre}','${autor.cargo}','${autor.descripcion}','${autor.tituloProfesional}', '${autor.testimonio}','${avatar}','${cv}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_AUTORES_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = AutorModel;
