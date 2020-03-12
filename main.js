var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./mysql.js');

function mainHandler(request, reply){
    var response = {
        status: "00",
        description: "SUCCESS"
    }

    console.log('\n\n===========================================================')
    console.log('                   REQUEST METHOD ' + request.method)
    console.log('===========================================================')

    console.log('\n REQUEST : ' + JSON.stringify(request) + '\n')
    
    if (typeof request.method === 'undefined'){
        response.status = "14"
        response.description = "METHOD NOT FOUND"
        reply(response)
    } else {
        if(request.method == "1111"){
            var query = 'INSERT INTO students(name,age,gender,class) VALUES("' + request.nama + '","' + request.umur + '","' + request.jenisKelamin + '","' + request.kelas + '")'
            mysql.insertUpdateGeneral(query, function(res){
                if(res.status == "00"){
                    console.log('-----------------------------------------------------------')
                    reply(response)
                } else {
                    console.log('-----------------------------------------------------------')
                    reply(res)
                }
            });
        } else if(request.method == "1112"){
            var query = 'UPDATE students SET class="' + request.kelas + '" WHERE id = "' + request.id + '"'
            mysql.insertUpdateGeneral(query, function(res){
                if(res.status == "00"){
                    console.log('-----------------------------------------------------------')
                    reply(response)
                } else {
                    console.log('-----------------------------------------------------------')
                    reply(res)
                }
            });
        } else if(request.method == "1212"){
            var query = 'DELETE FROM students WHERE id = "' + request.id + '"'
            mysql.deleteData(query, function(res){
                if(res.status == "00"){
                    console.log('-----------------------------------------------------------')
                    reply(response)
                } else {
                    console.log('-----------------------------------------------------------')
                    reply(res)
                }
            });
        } else if(request.method == "1000"){
            var query = 'SELECT * FROM users WHERE username="'+ request.username +'" LIMIT 1';
            mysql.GetGeneral(query, function(getData){
                if(getData.status == "00"){
                    var validatePwd = validatePassword(request, getData.data[0]);
                    if(validatePwd.status != "00"){
                        reply(validatePwd);
                    } else {
                        reply(getData)
                    }
                } else {
                    response.status = "14";
                    response.description = getData.description
                    console.log('-----------------------------------------------------------')
                    reply(response)
                }
            });
        } else {
            console.log("METHOD NOT AVAILABLE")
            response.status = "14"
            response.description = "METHOD NOT AVAILABLE"
            console.log('-----------------------------------------------------------')
            reply(response)
        }
    }
}

function validatePassword(request, dataDB){
    var response = {
        status: "00",
        description: "SUCCESS",
    }

    if(request.password != dataDB.password){
        response.status = "04"
        response.description = "WRONG PASSWORD"
        
        return response
    } else if(dataDB.status == 0){
        response.status = "05"
        response.description = "USER NOT ACTIVE"
        
        return response
    } else {
        return response
    }
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/test', function(req, res){
    var getBody = req.body;

    mainHandler(getBody, function(reply){
        res.send(reply)
    });
})

var server = app.listen(process.env.SERVER_PORT, function(){
    var port = server.address().port;
    
    console.log("SERVER RUNNING WITH PORT : " + port)
});