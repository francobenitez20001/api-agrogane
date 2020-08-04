const connection = require('../lib/mysql');

class ExitoModel{
    getAll(limit){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM casoexito ORDER BY idCaso DESC LIMIT ${limit}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM casoexito WHERE idCaso = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(caso,avatar){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CASOEXITO_ADD_UPDATE(0,'${caso.titulo}','${caso.subtitulo}','${caso.descripcion}','${avatar.filename}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw new Error(err);
                resolve(res);
            })
        })
    }

    update(id,caso,avatar){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CASOEXITO_ADD_UPDATE(${id},'${caso.titulo}','${caso.subtitulo}','${caso.descripcion}','${avatar}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw new Error(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_CASOEXITO_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ExitoModel;
