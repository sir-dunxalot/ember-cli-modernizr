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
  var path = options.directory + options.assetPath;
  var regex = new RegExp(options.content);
  var message = options.message || 'File should contain specified content';

  chai.assert.fileContentMatch(path, regex, message);
}
