#!/usr/bin/env node

//Script to invoke the operating system directly via node, to start mongodb. Cool!
/*Alternative to:
  1. Run the Mongo daemon, in one of your terminal windows run mongod. This should start the Mongo server.
  2. Run the Mongo shell, with the Mongo daemon running in one terminal, type mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
  3. To exit the Mongo shell run quit()
  4. To stop the Mongo daemon hit ctrl-c
*/

console.log('Starting MongoDB.');

//stdout not showing up with .exec, so using .spawn instead, which uses streams and event emitters
const spawn = require('child_process').spawn;

//Specify the dbPath for mongod to use as a data directory:
//spawn's arguments: mongosExecutableFile', and the command to run, as an array: --dbpath /data/db
//On Mac:
var mongod = spawn('/usr/local/Cellar/mongodb/3.4.9/bin/mongod', ['--dbpath', '/data/db']);
//On Windows: //var mongod = spawn('C:/Program Files/MongoDB/Server/3.4/bin/mongod.exe', ['--dbpath', 'C:/_data/db']);

mongod.stdout.on('data', function(data) {
  console.log('mongod | stdout : ' + data.toString());
});

mongod.stderr.on('data', function(data) {
  console.log('mongod | stderr : ' + data.toString());
});

mongod.on('exit', function(exitcode) {
  console.log('mongod process exited with code [' + exitcode.toString() + ']');
});