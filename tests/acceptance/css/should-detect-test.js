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
  'css/transitions',
  'history',
  'script/async',
  'css/mediaqueries',
  'css/transforms3d',
  'gamepad',
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
    shouldDetect('should-detect/css/core-detects.css', {
      featureDetects: coreFeatures
    });
  });

  it('should detect non-core features', function() {
    shouldDetect('should-detect/css/non-core-detects.css', {
      featureDetects: nonCoreFeatures
    });
  });

  it('should detect prefixed features', function() {
    shouldDetect('should-detect/css/prefixed-detects.css', prefixedFeatures, {
      classPrefix: 'mod',
      featureDetects:  prefixedFeatures,
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
