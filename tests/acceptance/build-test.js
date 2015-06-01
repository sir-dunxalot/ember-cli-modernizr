var chai = require('chai');
var defaultOptions = require('../../lib/default-options');
var emberCliModernizr = require('../helpers/ember-cli-modernizr');
var fs = require('fs');
var readFixture = require('../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;
var assertFileContains = require('../helpers/assert/file-contains');
var assertFileExists = require('../helpers/assert/file-exists');
var assertFileHasContent = require('../helpers/assert/file-has-content');

describe('Acceptance - Building', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('can build a Modernizr file', function() {
    return emberCliModernizr.buildWithOptions().then(function(results) {
      var directory = results.directory;

      assertFileExists(directory, 'modernizr-output-path.js');
    });
  });

  it('can build a Modernizr file with the correct tests', function() {
    return emberCliModernizr.buildWithOptions().then(function(results) {
      var directory = results.directory;

      assertFileExists(directory, 'modernizr-output-path.js');
    });
  });
});
