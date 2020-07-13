const connection = require('../lib/mysql2');
class AutorModel{
    
    getAll(){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM autores ORDER BY idAutor DESC`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM autores WHERE idAutor = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(autor,avatar){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_AUTORES_ADD_UPDATE(0,'${autor.nombre}','${autor.cargo}','${autor.descripcion}','${autor.tituloProfesional}', '${autor.testimonio}','${avatar}');`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,autor,avatar){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_AUTORES_ADD_UPDATE(${id},'${autor.nombre}','${autor.cargo}','${autor.descripcion}','${autor.tituloProfesional}', '${autor.testimonio}','${avatar}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw new Error(err);
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