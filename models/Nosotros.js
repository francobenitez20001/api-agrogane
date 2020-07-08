const MysqlLib = require('../lib/mysql');

class NosotrosModel{
    constructor(){
        this.db = new MysqlLib();
    }
    get(){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM nosotros LIMIT 1`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    create(nosotros){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_NOSOTROS_ADD_UPDATE(0,'${nosotros.descripcion}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,nosotros){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_NOSOTROS_ADD_UPDATE(${id},'${nosotros.descripcion}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

}

module.exports = NosotrosModel;