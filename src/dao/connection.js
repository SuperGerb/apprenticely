var MongoClient = require('mongodb').MongoClient;
var test = require('assert'); //For unit testing...
var dbName = "apprenticely";
var url = "mongodb://localhost:27017/" + dbName;
var fs = require("fs"); //Node's file system module
var dbConnection = null;

var connectionObj = {
    conn: function (callback) {
        if (dbConnection == null) {
            console.log("Path 1");
            MongoClient.connect(url, function (err, db) {
                //Note: the connect method returns a reference to the particular database.
                if (err) {
                    throw err;
                    console.log("Problem creating the database " + dbName);
                }
                console.log("Connection open.\nDatabase " + dbName + " created.");
                dbConnection = db;
                callback(db);
            });
        } else {
            console.log("Path 2");
            callback(dbConnection);
        }
    },
    close: function(callback){
        if (dbConnection != null){
            dbConnection.close();
            console.log("Connection closed.");
            callback("Connection closed");
        }else{
            callback("Wasn't open to begin with");
        }
    },
    display: function (db, callback) {
        var collection = db.collection("adverts");
        collection.find().toArray().then(function (results) {
            callback(results);
        });
    },
    delete: function (db, callback) {
        var collection = db.collection("adverts");
        collection.findOneAndDelete({ 'title': 'Two' }, function (err, result) {
            var itemToDelete = result;
            console.log("Deleted item : " + itemToDelete);
            callback(itemToDelete);
        });
    },
    insert: function(db, req, callback){
        var collection = db.collection("adverts"); 
        collection.insert(req);
        console.log("Req as seen by server is " + req);
        callback("Success!");
    },
    update: function(db, req, callback){
        var collection = db.collection("adverts");
        collection.updateOne({"title": req.title2 }, {$set:{"description": req.description2}});
        console.log("Req as seen by server is " + req.title2);
        callback("updated!");
    },
    clearAllDocs: function(db, callback){
        var collection = db.collection("adverts");
        collection.deleteMany(function (err, result) {
            var itemsToDelete = result;
            var message = "Deleted all docs in the adverts collection : " + itemsToDelete;
            console.log("Deleted all docs in the adverts collection");
            callback(message);
        });
    },
    loadTestData: function (db, callback) {
        fs.readFile('data.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
                console.log("Problem reading file.");
            }
            console.log("File read successfully. Contents:\n" + data);
            //When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object:
            var json = JSON.parse(data);

            for (var i in json) {
                var table = i;
                console.log("Creating collection= " + table);

                //Create collection (if already exists, it will be ignored):
                var collection = db.collection(table);
                var arrayOfTestData = json[i];
                collection.insertMany(arrayOfTestData);
                console.log("File contents inserted sucessfully.");
            }
            callback(data);
        });
    }
};

module.exports = connectionObj;



