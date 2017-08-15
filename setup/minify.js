var fs = require('fs');
var path = require('path');
var uglify = require("uglify-js");

const scriptDir = '../public/javascripts/';

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
    toplevel: true,
    compress: {
        passes: 3
    },
    output: {
        beautify: false
    }
  };

  var result = uglify.minify(minifyInputMap, options);

  if (reslt.error) {
    console.error(err);
    return;
  }

  fs.writeFile('concat.min.js', result.code, function (err){
    if(err) {
      console.error(err);
    } else {
      console.log("Script generated and saved:", 'concat.min.js');
    }      
  });
}