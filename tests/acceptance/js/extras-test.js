var chai = require('chai');
var emberCliModernizr = require('../helpers/ember-cli-modernizr');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;
var assertFileContains = require('../helpers/assert/file-contains');
var assertFileExists = require('../helpers/assert/file-exists');
var assertFileHasContent = require('../helpers/assert/file-has-content');

describe('Acceptance - Extras', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('detects the Modernizr.mq API', function() {
    var content = readFixture('extras/media-queries.js');
  });

  it('detects a core Modernizr.load call', function() {
    var content = readFixture('extras/core-load.js');
    var shouldReturn = [
      'test', // API
      'geolocation',
      'csstransitions'
    ];
  });

  it('detects a non-core Modernizr.load call', function() {
    var content = readFixture('extras/non-core-load.js');
  });

  it('can build a Modernizr file with the correct extras', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/extras'
    }).then(function(results) {
      var directory = results.directory;
      var outputPath = 'path-to-modernizr.js';
      var shouldFind = [
        'mq', // API
        'load', // API
        'geolocation', // Core
        'csstransitions', // Core
        'core', // Non-core
        'cssvhunit', // Non-core
      ];

      assertFileExists(directory, outputPath,
        'The Modernizr file should be built');

      shouldFind.forEach(function(methodName) {
        assertFileContains({
          directory: directory,
          assetPath: outputPath,
          content: 'Modernizr.' + methodName + ' = ',
          message: 'The Modernizr file should contain Modernizr.' = methodName
        });
      });

    });
  });
});
