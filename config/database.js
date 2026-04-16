let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siberita',
});

connection.connect(function(err){
    if(err){
       console.log(err); 
    }
    else{
        console.log("Koneksi Berhasil ");
    }
});

module.exports = connection;
