const MysqlLib = require('../lib/mysql');

class ExitoModel{
    constructor(){
        this.db = new MysqlLib();
    }
    getAll(limit){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM casoExito ORDER BY idCaso DESC LIMIT ${limit}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM casoExito WHERE idCaso = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(caso){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CASOEXITO_ADD_UPDATE(${caso.idCaso},'${caso.titulo}','${caso.subtitulo}','${caso.descripcion}','${caso.foto}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,caso){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CASOEXITO_ADD_UPDATE(${id},'${caso.titulo}','${caso.subtitulo}','${caso.descripcion}','${caso.foto}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`CALL SP_CASOEXITO_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ExitoModel;