var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/catsdb';
// Use connect method to connect to the Server 

MongoClient.connect(url, function(err, db){
    console.log("Connected correctly to server");

    var cats1 = db.collection('cats').find({gender: "female"}).toArray();
    var cats2 = db.collection('cats').find({age: {$gt: 6, $lt: 9}}).toArray();
    var cats3 = db.collection('cats').find().sort({age: -1}).limit(2).toArray();
    var cats4 = db.collection('cats').find({age: 6}).sort({name: 1}).toArray();
            
    cats1.then(function(cats){
        console.log(cats);
        console.log("\n");
    });
    
    cats2.then(function(cats){
        console.log(cats);
        console.log("\n");
    });
    
    cats3.then(function(cats){
        console.log(cats);
        console.log("\n");
    });

    cats4.then(function(cats){
        console.log(cats);
        console.log("\n");
    });
    
    Promise.all([cats1, cats2, cats3, cats4]).then(function(){
        db.close();
    });
});
