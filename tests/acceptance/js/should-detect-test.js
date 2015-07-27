var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

var coreFeatures = [
  'css/textshadow',
  'css/boxsizing',
  'history',
  'css/hsla',
  'css/opacity',
  'canvastext',
];

var nonCoreFeatures = [
  'pointerevents',
  'emoji',
  'battery',
  'css/mask',
  'css/boxsizing',
  'inputtypes',
];

describe('Acceptance - Should detect features (JS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should detect core features', function() {
    shouldDetect('should-detect/js/core-detects.js', {
      featureDetects: coreFeatures
    });
  });

  it('should detect non-core features', function() {
    shouldDetect('should-detect/js/non-core-detects.js', {
      featureDetects: nonCoreFeatures
    });
  });

  it('should build a Modernizr file with the correct extras', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/js'
    }).then(function(results) {
      shouldBuildWith(results.directory, {
        featureDetects: [
          'textshadow',
          'boxsizing',
          'history',
          'hsla',
          'opacity',
          'canvastext',
          'pointerevents',
          'emoji',
          'battery',
          'cssmask',
          'inputtypes',
        ],
      });
    });
  });

});
