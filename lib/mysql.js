const mysql = require('mysql');
const {config} = require('../config/index');

const connection = mysql.createConnection({
    host:config.dbHost,
    user:config.dbUser,
    password:config.dbPass,
    database:config.dbName
});
module.exports = connection;