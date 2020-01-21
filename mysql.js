var mysql = require('mysql');

var config = {
    mysql_db: process.env.MYSQL_DATABASE,
    mysql_host: process.env.MYSQL_HOST,
    mysql_port: process.env.MYSQL_PORT,
    mysql_user: process.env.MYSQL_USER,
    mysql_pass: process.env.MYSQL_PASSWORD
}

var insertUpdateGeneral = function(query, reply){
    var response = {
        status: "00",
        description: "INSERT OR UPDATE SUCCESS"
    }
    var pool = mysql.createPool({
        host: config.mysql_host,
        port: config.mysql_port,
        user: config.mysql_user,
        password: config.mysql_pass,
        database: config.mysql_db
    });

    pool.getConnection(function(err, connection){
        connection.query(query, function(err, fields){
            if (err){
                console.log(err)
                response.status = "14";
                response.description = "INSERT OR UPDATE FAILED";
                console.log(response)
                reply(response)
            } else {
                console.log(response.description)
                reply(response)
            }
        })
    });
}
module.exports.insertUpdateGeneral = insertUpdateGeneral;

var deleteData = function(query, reply){
    var response = {
        status: "00",
        description: "DELETE SUCCESS"
    }
    var pool = mysql.createPool({
        host: config.mysql_host,
        port: config.mysql_port,
        user: config.mysql_user,
        password: config.mysql_pass,
        database: config.mysql_db
    });

    pool.getConnection(function(err, connection){
        connection.query(query, function(err, fields){
            if (err){
                console.log(err)
                response.status = "14";
                response.description = "DELETE FAILED";
                console.log(response)
                reply(response)
            } else {
                console.log(response.description)
                reply(response)
            }
        })
    });
}
module.exports.deleteData = deleteData;

var GetGeneral = function(querys, reply){
    var response = {
        status: "00",
        description: "GET DATA SUCCESS"
    }
    var pool = mysql.createPool({
        host: config.mysql_host,
        port: config.mysql_port,
        user: config.mysql_user,
        password: config.mysql_pass,
        database: config.mysql_db
    });

    pool.getConnection(function(err, connection){
        connection.query(querys, function(err, fields){
            if (err){
                console.log(err)
                response.status = "14";
                response.description = "GET DATA FAILED";
                console.log(response)
                reply(response)
            } else if(typeof fields[0] === 'undefined'){
                response.status = "14";
                response.description = "DATA NOT FOUND";
                console.log("DATA NOT FOUND")
                reply(response)
            } else {
                var data = new Array(fields.length);

                for(i=0; i < fields.length; i++){
                    data[i] = fields[i];
                }
                response["data"] = data;
                reply(response)
            }
        })
    });
}
module.exports.GetGeneral = GetGeneral;