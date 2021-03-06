var http = require('http');
var fs = require('fs'); //Node's file system module
var mongodb = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var connection = require('../dao/connection.js');
const path = require('path');
const uuidv4 = require('uuid/v4');
const JSServerUtils = require('../utils/js-server-utils.js');
const profilicServer = require('profilic-server');

//load env
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//Create an instance of Express: 
var app = express();
profilicServer.configureExpressApp(app, true);

var absPathToPublicFolder = path.join(__dirname, '..', '..', 'public');

//ensure images folder exists before trying to write to it:
const absPathToClassifAdImgs = process.env.CLASSIFADS_IMAGEDIR;
JSServerUtils.ensureFolderExists(absPathToClassifAdImgs);

//Specify file uploads folder:
const storageForImageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'src/server/classifiedImageUploads/')
    cb(null, absPathToClassifAdImgs)
  },
  //Give the each file a unique name, and conserve its file type extension:
  filename: function (req, file, cb) {
    let startOfExtension = (file.originalname).length - (file.originalname).lastIndexOf('.');
    let extension = (file.originalname).slice(-startOfExtension);
    cb(null, uuidv4() + extension);
  }
});
const uploadsFolder = multer({ storage: storageForImageFiles });

//Specify the maximum number of images a user can upload when creating a classified ad:
const maxImageUploads = 5;

//Express is now my web server, not Node, so no need to createServer here at all.

//Configuring Express to use body-parser as middle-ware in order to parse the body of http requests, and therefore be able to fulfill basic POST requests. (For multipart form data, Multer is used.):
//Support parsing of application/json type post data:
// app.use(bodyParser.json());
// //Support parsing of application/x-www-form-urlencoded post data: 
// app.use(bodyParser.urlencoded({ extended: true }));

// //To serve a static page (index.html):
app.use(express.static(absPathToPublicFolder));

app.get('/', function (req, res) {
  res.sendFile(path.join(absPathToPublicFolder, "index.html"));
});

// app.use(express.static(path.resolve('public'))); //'public' folder will be html web root
// app.get('*', function(req, res){
//   //this catch-all is here to support react router
//   res.sendFile(path.resolve(path.join('public','index.html')));
// });
app.use(function (err, req, res, next) {
  //this is the generic, catch-all error handler
  res.status(500).render('error', { message: 'An Internal Server Error occured.' });
});



//Configure server:
// GET method route
//These http request handlers simply use Express, not any routers. (They use express's get method, which routes HTTP GET requests to the specified path with the specified callback functions):
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
  //Recuperate the ad limit from the url:
  let adLimit = parseInt(req.query.adLimit);
    connection.conn(function (dbConnection) {
      connection.displayListViewClassifieds(dbConnection, adLimit, function (data) {
        res.send(data);
      });
    });
});

app.get('/posts/filter/username/:username', function (req,  res) {
  let theUsername = req.params.username;
  if(!theUsername){
    console.log("############## WOOPS ##########");
    throw (new Error('No username provided'));
  } else {
    connection.conn(function (dbConnection) {
      connection.adsFilteredByUsername(dbConnection, theUsername, function (data) {
        console.log("############## SENDING FILTERED ADS BACK ##########");
        console.log("data");
        res.send(data);
      });
    });
  }
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
app.post('/adCreatedConfirmation', uploadsFolder.array('images', maxImageUploads), function (req, res) {
  //Deal with the file uploads (the images):
  let requestBody = req.body;
  let dataToSave = {};

  Object.keys(requestBody).forEach((key) => {
    dataToSave[key] = requestBody[key];
  });

  if (req.files !== undefined) {
    let images = req.files;
    let imageArray = [];
    let numberOfImages = images.length;

    for (let i = 0; i < numberOfImages; i++) {
      let imgName = "image" + i;
      let imgFilename = images[i].filename;
      let imageObj = { imgName, imgFilename };
      imageArray.push(imageObj);
      //dataToSave["image" + i], images[i].filename;
    }

    dataToSave["images"] = imageArray;
  }

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

app.post('/adInquiryConfirmation', function (req, res) {
  //To do: send email and return success message
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(absPathToPublicFolder, "index.html"));
});


//Lastly, listen for incoming http requests: 
app.listen(PORT);
console.log("========== Server is UP : Listening on port", PORT, "===========");

