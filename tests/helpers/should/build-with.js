var assertFileContains = require('../assert/file-contains');
var assertFileDoesNotExist = require('../assert/file-does-not-exist');
var assertFileExists = require('../assert/file-exists');
var defaultConfig = require('../../../lib/default-config');

/**
Assert that the Modernizr file is built and contains the specified assertions. If no assertions are passed it will check the file does not exists (i.e. Modernizr found no references).

@method buildWith
@param {String} directory The absolute path to the tmp directory
@param {Array} expectedDetections An array of detections to find in the Modernizr build. Pass false, [], or no param to assert the file does not exist
*/

function buildWith(directory, expectedContent) {
  var outputPath = '/' + defaultConfig.outputDir + '/' + defaultConfig.outputFileName + '.js'; // TODO
  var featureDetects, options;

  if (expectedContent) {
    featureDetects = expectedContent.featureDetects;
    options = expectedContent.options;

    assertFileExists(directory, outputPath,
      'The custom Modernizr file should be built');

    if (featureDetects) {
      featureDetects.forEach(function(featureName) {
        var expectedTest;

        if (featureName === 'inputtypes'){
          expectedTest = 'Modernizr[\'' + featureDetects + '\']';
        } else {
          expectedTest = 'Modernizr.addTest[(]\'' + featureName;
        }

        assertFileContains({
          directory: directory,
          assetPath: outputPath,
          content: expectedTest,
          message: 'The built Modernizr file should contain ' + expectedContent,
        });
      });
    } else if (options) {
      options.forEach(function(option) {
        var expectedCode;

        if (option === 'addTest') {
          expectedCode = option + ':';
        } else {
          expectedCode = 'ModernizrProto.' + option;
        }

        assertFileContains({
          directory: directory,
          assetPath: outputPath,
          content: expectedCode,
          message: 'The built Modernizr file should contain ' + expectedCode,
        });
      });
    }
  } else {
    assertFileDoesNotExist(directory, outputPath);
  }
}

module.exports = buildWith;
