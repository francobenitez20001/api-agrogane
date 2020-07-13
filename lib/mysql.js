const mysql = require('mysql');
const {config} = require('../config/index');

/*function connect() {
    const connection = mysql.createConnection({
        host:config.dbHost,
        user:config.dbUser,
        password:config.dbPass,
        database:config.dbName
    });
    connection.on('error', connect())
}*/
const connection = mysql.createPool({
    host:config.dbHost,
    user:config.dbUser,
    database:config.dbName,
    password:config.dbPass
});
module.exports = connection;