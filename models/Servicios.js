const MysqlLib = require('../lib/mysql');

class ServiciosModel{
    constructor(){
        this.db = new MysqlLib();
    }
    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM servicios`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    getOne(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM servicios WHERE idServicio = ${id}`,(err,res,fields)=>{
                if(err)throw reject(err);
                resolve(res);
            })
        })
    }

    create(servicio){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_SERVICIOS_ADD_UPDATE(0,'${servicio.titulo}','${servicio.descripcion}','${servicio.icono}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,servicio){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_SERVICIOS_ADD_UPDATE(${id},'${servicio.titulo}','${servicio.descripcion}','${servicio.icono}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            this.db.query(`CALL SP_SERVICIOS_DELETE(${id})`,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        }) 
    }

}

module.exports = ServiciosModel;