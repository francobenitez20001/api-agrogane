const connection = require('../lib/mysql');

class ContactoModel{
    
    getAll(){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM contacto ORDER BY idContacto DESC LIMIT 1`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

    create(contacto){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CONTACTO_ADD_UPDATE(${contacto.idContacto},'${contacto.telefonoPrincipal}','${contacto.telefonoSecundario}','${contacto.email}','${contacto.facebook}', '${contacto.instagram}','${contacto.twitter}','${contacto.linkedin}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw console.log(err);
                resolve(res);
            })
        })
    }

    update(id,contacto){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_CONTACTO_ADD_UPDATE(${id},'${contacto.telefonoPrincipal}','${contacto.telefonoSecundario}','${contacto.email}','${contacto.facebook}', '${contacto.instagram}','${contacto.twitter}','${contacto.linkedin}')`;
            connection.query(query,(err,res,fiels)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }

}

module.exports = ContactoModel;