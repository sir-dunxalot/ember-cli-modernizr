var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

describe('Acceptance - Should return tests (CSS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('should detect core features', function() {
    var content = readFixture('should-return-tests/css/core-detects.css');
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
    var content = readFixture('should-return-tests/css/non-core-detects.css');
    var shouldFind = [
      'pointerevents',
      'emoji',
      'battery',
      'cssmask',
      'boxsizing',
      'inputtypes.time',
    ];
  });

  it('should detect prefixed features', function() {
    var content = readFixture('should-return-tests/css/prefixed-detects.css');
    var shouldFind = [
      'csstransitions',
      'history',
      'scriptasync',
      'mediaqueries',
      'transforms3d',
      'gamepads',
    ];
    var shouldNotFind = [
      'someotherthing',
      'geolocation',
      'borderimage',
    ];
  });
});
