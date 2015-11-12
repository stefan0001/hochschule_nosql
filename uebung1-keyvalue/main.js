var redis = require('redis');
var express = require('express');
var app = express();
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});


client.set("hochschule:professor","Thomas Smits");
client.set("hochschule:fak","Informatik");
client.set("hochschule:institut","Robotik");

app.get('/:id', function (request, response) {
    var id = request.params.id;
    
    client.get(id, function(err, reply) {
        if(reply){
            response.send(reply);
        } else{
            response.sendStatus(404);
        }
    });
});



var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});
