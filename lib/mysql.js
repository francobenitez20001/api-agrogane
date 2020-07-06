const mysql = require('mysql');
const {config} = require('../config/index');

class MysqlLib{
    constructor() {    
        this.handleDisconnect();
        return this.connection;
    }

    handleDisconnect() {
        this.connection = mysql.createConnection({
            host:config.dbHost,
            user:config.dbUser,
            password:config.dbPass,
            database:config.dbName
        });
      
        this.connection.connect(err=>{             
            if(err) {                                    
                console.log('error when connecting to db:', err);
                setTimeout(this.handleDisconnect,2000); 
            }else{
                console.log('conectado');
            }  
        })
        this.connection.on('error',err=>{
            console.log(err);
            this.handleDisconnect();
        })
    };


    disconect(){
        this.connection.end();
    }

    connect(){
        this.connection.connect();
    }

}
module.exports = MysqlLib;