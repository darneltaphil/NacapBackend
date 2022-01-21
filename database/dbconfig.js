//MySQL Credentials
const mysql = require("mysql")

const dbConn = mysql.createConnection({
    host: 'localhost',
    user :  'root',
    password : '',
    database : 'nacap_db',
});

dbConn.connect(function(err){
    if (err) throw err;
    console.log('Database connected sucessfully');
})

module.exports = dbConn;