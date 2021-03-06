const connection = require('../lib/mysql');

class NosotrosModel{
    get(){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM nosotros LIMIT 1`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    create(nosotros,header){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_NOSOTROS_ADD_UPDATE(0,'${nosotros.descripcion}','${nosotros.header}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,nosotros,header){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_NOSOTROS_ADD_UPDATE(${id},'${nosotros.descripcion}','${header}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

}

module.exports = NosotrosModel;