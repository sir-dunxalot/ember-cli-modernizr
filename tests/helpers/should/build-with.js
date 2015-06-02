var assertFileDoesNotExist = require('../assert/file-does-not-exist');
var chai = require('chai');
var parseFixture = require('../parse-fixture');
var assert = chai.assert;

/**
Assert that the Modernizr file is built and contains the specified assertions. If no assertions are passed it will check the file does not exists (i.e. Modernizr found no references).

@method buildWith
@param {String} directory The absolute path to the tmp directory
@param {Array} expectedDetections An array of detections to find in the Modernizr build. Pass false, [], or no param to assert the file does not exist
*/

function buildWith(directory, expectedDetections) {
  var outputPath = 'path-to-modernizr.js'; // TODO

  if (expectedDetections && expectedDetections.length) {

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
  } else {
    assertFileDoesNotExist(directory, outputPath);
  }
}

module.exports = buildWith;
