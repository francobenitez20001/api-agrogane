const MysqlLib = require('../lib/mysql');

class ContactoModel{
    constructor(){
        this.db = new MysqlLib();
    }
    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM contacto ORDER BY idContacto DESC LIMIT 1`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    create(contacto){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CONTACTO_ADD_UPDATE(${contacto.idContacto},'${contacto.telefonoPrincipal}','${contacto.telefonoSecundario}','${contacto.email}','${contacto.facebook}', '${contacto.instagram}','${contacto.twitter}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,contacto){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CONTACTO_ADD_UPDATE(${id},'${contacto.telefonoPrincipal}','${contacto.telefonoSecundario}','${contacto.email}','${contacto.facebook}', '${contacto.instagram}','${contacto.twitter}')`;
            this.db.query(query,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

}

module.exports = ContactoModel;