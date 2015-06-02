var chai = require('chai');
var parseFixture = require('../parse-fixture');
var assert = chai.assert;

function buildWith(directory, expectedDetections) {
  var outputPath = 'path-to-modernizr.js'; // TODO

  assertFileExists(directory, outputPath,
    'The custom Modernizr file should be built');

  expectedDetections.forEach(function(methodName) {
    assertFileContains({
      directory: directory,
      assetPath: outputPath,
      content: 'Modernizr.' + methodName + ' = ',
      message: 'The built Modernizr file should contain Modernizr.' + methodName
    });
  });
}

module.exports = buildWith;
