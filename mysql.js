const mysql = require("mysql")

module.exports = () => {

    // * Crea una conexion con la base de datos
    return mysql.createConnection({
        host:'bv6eqwkhfffipedzp8xa-mysql.services.clever-cloud.com',
        database:'bv6eqwkhfffipedzp8xa',
        user:'u4hratvhgfarosjd',
        password:'J0NkUgUb4CyrUqZHofmJ',
        port:3306
    })
    
}