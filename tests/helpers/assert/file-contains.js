var fs = require('fs');
var chai = require('chai');

/**
options: {
  directory:,
  assetPath:,
  content:,
  message:,
}

Assert whether a file contains particular content
somewhere within it using Chai-fs
@method fileContains
*/

module.exports = function(options) {
  var content = options.content;
  var regex = new RegExp(content);
  var path = options.directory + options.assetPath;
  var message = options.message || 'File should contain ' + content;

  // console.log(fs.readFileSync(path, { encoding: 'utf8' }));

  chai.assert.fileContentMatch(path, regex, message);
}
