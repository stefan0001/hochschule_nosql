var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/catsdb';
// Use connect method to connect to the Server 

MongoClient.connect(url, function(err, db){
    console.log("Connected correctly to server");
    
    var cats = db.collection('cats');
    cats.insert([
        {
            name: "Coco",
            age: 5,
            gender: "female",
            height: 25,
            weight: 3200,
            color : "BROWN"
        }, {
            name: "Lili",
            age: 6,
            gender: "female",
            height: 25,
            weight: 3200,
            color : "BROWN"
        }, {
            name: "Sunny",
            age: 7,
            gender: "female",
            height: 25,
            weight: 3200,
            color : "BLACK"
        }, {
            name: "Luna",
            age: 5,
            gender: "female",
            height: 25,
            weight: 3200,
            color : "BLACK"
        }, {
            name: "Mimi",
            age: 6,
            gender: "female",
            height: 25,
            weight: 3200,
            color : "BLACK"
        }, {
            name: "Tiger",
            age: 7,
            gender: "male",
            height: 25,
            weight: 3200,
            color : "BLACK"
        }, {
            name: "Mo",
            age: 8,
            gender: "male",
            height: 25,
            weight: 3200,
            color : "WHITE"
        }, {
            name: "Sammy",
            age: 9,
            gender: "male",
            height: 25,
            weight: 3200,
            color : "WHITE"
        }, {
            name: "Caesar",
            age: 7,
            gender: "male",
            height: 25,
            weight: 3200,
            color : "WHITE"
        }, {
            name: "Felix",
            age: 7,
            gender: "male",
            height: 25,
            weight: 3200,
            color : "WHITE"
        }
    ], function(){
        db.close();
    });
});
