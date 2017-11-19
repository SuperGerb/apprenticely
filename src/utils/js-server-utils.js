const path = require('path');
const fs = require('fs');

//server-side utilities using node-specific libs that webpack isn't going to be able to find and pack.
const JSServerUtils = {
  ensureFolderExists: function(targetDir){
    let sep = "/" //any paths we have should be in .env file, and that always uses forward slashes
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    targetDir.split("/").reduce((parentDir, childDir) => {
      const curDir = path.resolve(parentDir, childDir);
      if (!fs.existsSync(curDir)) {
        console.log("about to create ", curDir);
        fs.mkdirSync(curDir);
      }
      return curDir;
    }, initDir);
  }
  
};

module.exports = JSServerUtils;