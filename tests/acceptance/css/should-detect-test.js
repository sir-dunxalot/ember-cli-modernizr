var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

var coreFeatures = [
  'css/transitions',
  'history',
  'css/gradients',
  'touchevents',
  'geolocation',
  'webgl',
  'css/flexbox',
  'css/borderimage',
];

var nonCoreFeatures = [
  'file/filesystem',
  'cors',
  'css/objectfit',
  'url/data-uri',
  'json',
  'quota-management-api',
  'workers/dataworkers',
  'userdata',
];

var prefixedFeatures = [
  'csstransitions',
  'history',
  'scriptasync',
  'mediaqueries',
  'csstransforms3d',
  'gamepads',
];

describe('Acceptance - Should detect tests (CSS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should detect core features', function() {
    shouldDetect('should-detect/css/core-detects.css', coreFeatures);
  });

  it('should detect non-core features', function() {
    shouldDetect('should-detect/css/non-core-detects.css', nonCoreFeatures);
  });

  it('should detect prefixed features', function() {
    shouldDetect('should-detect/css/prefixed-detects.css', prefixedFeatures, {
      extensibility: {
        cssclassprefix: 'mod',
      }
    });
  });

  it('should build a Modernizr file with CSS detects', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/css'
    }).then(function(results) {
      shouldBuildWith(results.directory, coreFeatures.join(nonCoreFeatures));
    });
  });

  it('should build a Modernizr file with prefixed CSS detections', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/css',
      extensibility: {
        cssclassprefix: 'mod',
      }
    }).then(function(results) {
      shouldBuildWith(results.directory, prefixedFeatures);
    });
  });
});
