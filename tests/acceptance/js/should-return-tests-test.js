var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

// Need a test for html5 shim settings
// Need a test for prefixes

describe('Acceptance - Should return tests (JS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('should detect core features', function() {
    var content = readFixture('should-return-tests/js/core-detects.js');
    var shouldFind = [
      'textshadow',
      'boxsizing',
      'history',
      'hsla',
      'opacity',
      'canvastext',
    ];
  });

  it('should detect non-core features', function() {
    var content = readFixture('should-return-tests/js/core-detects.js');
    var shouldFind = [
      'pointerevents',
      'emoji',
      'battery',
      'cssmask',
      'boxsizing',
      'inputtypes.time',
    ];
  });
});
