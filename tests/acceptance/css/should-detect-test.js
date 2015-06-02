var emberCliModernizr = require('../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

var coreFeatures = [
  'textshadow',
  'boxsizing',
  'history',
  'hsla',
  'opacity',
  'canvastext',
];

var nonCoreFeatures = [
  'pointerevents',
  'emoji',
  'battery',
  'cssmask',
  'boxsizing',
  'inputtypes.time',
];

var prefixedFeatures = [
  'csstransitions',
  'history',
  'scriptasync',
  'mediaqueries',
  'transforms3d',
  'gamepads',
];

describe('Acceptance - Should return tests (CSS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should detect core features', function() {
    shouldDetect('should-return-tests/css/core-detects.css', coreFeatures);
  });

  it('should detect non-core features', function() {
    shouldDetect('should-return-tests/css/non-core-detects.css', nonCoreFeatures);
  });

  it('should detect prefixed features', function() {
    // Should not find someotherthing, geolocation, and borderimage
    shouldDetect('should-return-tests/css/prefixed-detects.css', prefixedFeatures);
  });


  it('should build a Modernizr file with CSS detects', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/css'
    }).then(function(results) {
      shouldBuildWith(directory, coreFeatures.join(nonCoreFeatures));
    });
  });

  it('should build a Modernizr file with prefixed CSS detections', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/css',
      extensibility: {
        cssclassprefix: 'mod',
      }
    }).then(function(results) {
      shouldBuildWith(directory, prefixedFeatures);
    });
  });
});
