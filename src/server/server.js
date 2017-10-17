//1. Require les modules comme mysql et express :
var http = require('http');
var fs = require('fs'); //Node's file system module
var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var connection = require('../dao/connection.js');
const path = require("path");
//Create an instance of Express: 
var app = express();

//Express is now my web server, not Node, so no need to createServer here at all.

//Configuring Express to use body-parser as middle-ware in order to parse the body of http requests, and therefore be able to fulfill POST requests:
//Support parsing of application/json type post data:
app.use(bodyParser.json());
//Support parsing of application/x-www-form-urlencoded post data: (My post request uses this one):
app.use(bodyParser.urlencoded({ extended: true }));

//To serve a static page (index.html):
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', function (req, res) {
    res.sendfile(path.join("public", "index.html"));
});

//Configure server:
// GET method route
//These http request handlers simply use Express, not any routers:
//(They use express's get method, which routes HTTP GET requests to the specified path with the specified callback functions)

app.get('/test', function (req, res) {
    connection.conn(function (dbConnection) {
        res.send(dbConnection.databaseName);
    });
});

app.get('/clearAllDocs', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.clearAllDocs(dbConnection, function (message) {
            res.send(message);
        });
    });
});

app.get('/loadTestData', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.loadTestData(dbConnection, function (data) {
            res.send(data);
        });
    });
});

app.get('/display', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.find(dbConnection, function (descToWrite) {
            res.send(descToWrite);
        });
    });
});

app.get('/delete', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.delete(dbConnection, function (itemToDelete) {
            res.send(itemToDelete);
        });
    });
});


app.get('/closeConnection', function (req, res) {
    connection.close(function (message) {
        res.send(message);
    });
});

//Tells the Express module to wait for an HTTP request at the /confirmationScreen form route, that leverages the POST HTTP verb: 
app.post('/confirmationScreen', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.insert(dbConnection, req.body, function (message) {
            //Tell browser what type of data to expect back from the server:
            res.setHeader('Content-Type', 'application/json');
            //res.send sends the result body back to the user. We are sending a serialized JSON object. To construct this object, we access the body property of the req object, which allows us to parse the properties of the request body
            res.send(JSON.stringify({
                //Build the JSON for the result object:
                title: req.body.title || null,
                description: req.body.description || null,
                location: req.body.location || null,
                category: req.body.category || null,
                type: req.body.type || null,
                idPerson: req.body.idPerson || null
            }));
            console.log("Req is " + req);
            console.log("Req.body is " + req.body);
            console.log('req.body.name', req.body['title']);
            console.log("Req stringified is " + JSON.stringify(req.body));
            console.log(message + ' New entry added! Title: ' + req.body.title);
        });
    });
});

app.post('/confirmationUpdateScreen', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.update(dbConnection, req.body, function (message) {
            res.send("Description for title: " + req.body.title2 + ", has been " + message);
        });
        console.log("Description updated");
    });
});

//Next, could send the form using Ajax to avoid the page refresh

//Post requests will require axios or similar (an http service)... I'm using body-parser. 
/*//Where to put axios -- client side instead? Apparently it can operate on both sides
axios.post('/create', {
    "title": "Four",
    "description": "Banjo players wanted",
    "location": "Montreal",
    "category": "music",
    "type": "wanted",
    "idPerson": "004"
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
*/

//Lastly, listen for incoming http requests: 
app.listen(8080);


//var router = require('./routes/classifieds'); 

//app.use tells Express about a middleware component
//app.use('/display', router);
//

