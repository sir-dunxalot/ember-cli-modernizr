var chai = require('chai');
var emberCliModernizr = require('../helpers/ember-cli-modernizr');
var defaultOptions = require('../../lib/default-options');
var readFixture = require('../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

// Need a test for html5 shim settings
// Need a test for prefixes

describe('Acceptance - Parsing', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('compiles the correct files with default options', function() {
    return emberCliModernizr.buildWithOptions().then(function(results) {
      var directory = results.directory;

      console.log(readFixture('extensibility/prefixes.js'));

      /* Run assertions on files in tmp directory here */
    });
  });
});
