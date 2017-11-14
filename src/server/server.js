//1. Require les modules comme mysql et express :
var http = require('http');
var fs = require('fs'); //Node's file system module
var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var connection = require('../dao/connection.js');
const path = require('path');
//Create an instance of Express: 
var app = express();

var absPathToPublicFolder = path.join(__dirname, '..', '..', 'public');

//Specify file uploads folder:
const storageForImageFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/server/classifiedImageUploads/')
    },
    filename: function (req, file, cb) {
        let startOfExtension = (file.originalname).lastIndexOf('.');
        let extension = (file.originalname).slice(-startOfExtension);
        //To do: generate a more unique filename! 
        cb(null, new Date().getTime() + extension);
    }
});

const uploadsFolder = multer({ storage: storageForImageFiles });

//And the maximum number of images a user can upload when creating a classified ad:
const maxImageUploads = 100;

//Express is now my web server, not Node, so no need to createServer here at all.

//Configuring Express to use body-parser as middle-ware in order to parse the body of http requests, and therefore be able to fulfill POST requests:
//Support parsing of application/json type post data:
app.use(bodyParser.json());
//Support parsing of application/x-www-form-urlencoded post data: (My post request uses this one):
app.use(bodyParser.urlencoded({ extended: true }));

//To serve a static page (index.html):
app.use(express.static(absPathToPublicFolder));

app.get('/', function (req, res) {
    res.sendFile(path.join(absPathToPublicFolder, "index.html"));
});

//Configure server:
// GET method route
//These http request handlers simply use Express, not any routers:
//(They use express's get method, which routes HTTP GET requests to the specified path with the specified callback functions)
app.get('/accessTaxonomy', function (req, res) {
    fs.readFile((__dirname + '/taxonomy.json'), 'utf8', function (err, data) {
        if (err) {
            throw err;
            console.log("Problem reading taxonomy file.");
        }
        res.send(data);
    });
});

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

app.get('/classifiedsListView', function (req, res) {
    connection.conn(function (dbConnection) {
        connection.displayListViewClassifieds(dbConnection, function (data) {
            res.send(data);
        });
    });
});

app.get('/displayDetailViewClassifiedAd', function (req, res) {
    //Recuperate the adId query string from the url:
    let id = req.query.adId;
    connection.conn(function (dbConnection) {
        connection.displayDetailViewClassifiedAd(dbConnection, id, function (data) {
            res.send(data);
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

//Tells the Express module to wait for an HTTP request at the /adCreatedConfirmation form route, that leverages the POST HTTP verb: 
app.post('/adCreatedConfirmation', uploadsFolder.single('images'), function (req, res) {
    //Deal with the file uploads (the images):
    let requestBody = req.body;
    let dataToSave = {};

    //I could change this to map():
    Object.keys(requestBody).forEach((key) => {
        dataToSave[key] = requestBody[key];
    });

    if (req.file !== undefined) {
        dataToSave["images"] = req.file.filename;
    }

    //Next, try uploading an array of files!
    // Not sure this is still correct:
    //Using multer, req.files would contain an array of files if I used multiple file inputs in my form. Instead I use a drag and drop zone and save all the files to an array before putting them in the FormData object (key = "images") and sending them to the server. So they're accessible instead via req.body.images

    connection.conn(function (dbConnection) {
        connection.insert(dbConnection, dataToSave, function (message) {
            //Tell browser what type of data to expect back from the server:
            res.setHeader('Content-Type', 'application/json');
            //res.send sends the result body back to the user. We are sending a serialized JSON object. To construct this object, we can access the body property of the req object, which allows us to parse the properties of the request body.
            res.send(JSON.stringify());
            console.log(message + " New entry added! Title: " + req.body.title);
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

app.get('/*', function (req, res) {
    res.sendFile(path.join(absPathToPublicFolder, "index.html"));
});


//Lastly, listen for incoming http requests: 
app.listen(8080);

