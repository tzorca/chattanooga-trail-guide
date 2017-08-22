var fs = require('fs');
var path = require('path');
var uglify = require("uglify-js");

const scriptDir = './public/javascripts/';
const outputFilePath = './public/javascripts-min/combined.min.js';

var filePaths = [];
fs.readdir(scriptDir, function(err, fileNames) {
  if (err) {
    console.error(err);
    return;
  } else {
    filePaths = fileNames.map(function(fileName) {
      return path.resolve(scriptDir + fileName);
    });
    buildMinifiedScript(filePaths);
  }
});

function buildMinifiedScript(filePaths) {
  console.log(filePaths);
  var minifyInputMap = {};
  filePaths.forEach(function(filePath) {
    var fileData = fs.readFileSync(filePath, "utf8");
    minifyInputMap[filePath] = fileData;
  });

  var options = {
    compress: {
      passes: 3
    },
    output: {
        beautify: false
    }
  };

  var result = uglify.minify(minifyInputMap, options);

  if (result.error) {
    console.error(err);
    return;
  }

  fs.writeFile(outputFilePath, result.code, function (err){
    if(err) {
      console.error(err);
    } else {
      console.log("Script generated and saved:", outputFilePath);
    }      
  });
}