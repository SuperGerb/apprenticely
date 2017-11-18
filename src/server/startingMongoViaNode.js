#!/usr/bin/env node

//Script to invoke the operating system directly via node, to start mongodb. Cool!
/*Alternative to:
  1. Run the Mongo daemon, in one of your terminal windows run mongod. This should start the Mongo server.
  2. Run the Mongo shell, with the Mongo daemon running in one terminal, type mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
  3. To exit the Mongo shell run quit()
  4. To stop the Mongo daemon hit ctrl-c
*/

console.log('Starting MongoDB.');

//load config
require('dotenv').config();
let mongoPath = process.env.MONGO_PATH;
let mongoDataDir = process.env.MONGO_DATADIR;

//stdout not showing up with .exec, so using .spawn instead, which uses streams and event emitters
const spawn = require('child_process').spawn;

var mongod = spawn(mongoPath, ['--dbpath', mongoDataDir]);

mongod.stdout.on('data', function(data) {
  console.log('mongod | stdout : ' + data.toString());
});

mongod.stderr.on('data', function(data) {
  console.log('mongod | stderr : ' + data.toString());
});

mongod.on('exit', function(exitcode) {
  console.log('mongod process exited with code [' + exitcode.toString() + ']');
});