var chai = require('chai');

/**
options: {
  directory:,
  assetPath:,
  content:,
  message:,
}

Assert whether a file does not contains particular content within it using Chai-fs
@method fileDoesNotContain
*/

 function fileDoesNotContain(options) {
  var path = options.directory + options.assetPath;
  var regex = new RegExp(options.content);
  var message = options.message || 'File should contain specified content';

  chai.assert.notFileContentMatch(path, regex, message);
}

module.exports = fileDoesNotContain;
