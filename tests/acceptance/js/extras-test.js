var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

describe('Acceptance - Extras', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('detects the Modernizr.mq API', function() {
    var content = readFixture('extras/media-queries.js');
  });

  it('detects a core Modernizr.load call', function() {
    var content = readFixture('extras/core-load.js');
  });

  it('detects a non-core Modernizr.load call', function() {
    var content = readFixture('extras/non-core-load.js');
  });
});
