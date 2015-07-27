var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

describe('Acceptance - Options', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should detect multiple Modernizr.addTest methods', function() {
    shouldDetect('extensibility/add-test-multiple.js', {
      options: ['addTest']
    });
  });

  it('should detect a single Modernizr.addTest method', function() {
    shouldDetect('extensibility/add-test-single.js', {
      options: ['addTest']
    });
  });

  it('should detect the Modernizr._domPrefixes API', function() {
    shouldDetect('extensibility/dom-prefixes.js', {
      options: ['domPrefixes']
    });
  });

  it('should detect the Modernizr.hasEvent API', function() {
    shouldDetect('extensibility/has-event.js', {
      options: ['hasEvent']
    });
  });

  it('should detect the Modernizr._prefixes API', function() {
    shouldDetect('extensibility/prefixes.js', {
      options: ['prefixes']
    });
  });

  it('should detect the Modernizr.testAllProps API', function() {
    shouldDetect('extensibility/test-all-props.js', {
      options: ['testAllProps']
    });
  });

  it('should detect the Modernizr.testProp API', function() {
    shouldDetect('extensibility/test-prop.js', {
      options: ['testProp']
    });
  });

  it('should detect the Modernizr.testStyles API', function() {
    shouldDetect('extensibility/test-styles.js', {
      options: ['testStyles']
    });
  });

  it('should detect the Modernizr.mq API', function() {
    shouldDetect('extras/media-queries.js', {
      options: ['mq']
    });
  });

  it('should detect a core Modernizr.load call', function() {
    shouldDetect('extras/core-load.js', {
      featureDetects: ['geolocation', 'css/transitions'],
      options: ['load']
    });
  });

  it('should detect a non-core Modernizr.load call', function() {
    shouldDetect('extras/non-core-load.js', {
      featureDetects: ['cors', 'css/vhunit'],
      options: ['load']
    });
  });

  it('should build a Modernizr file with the correct extensibility detections', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/extensibility'
    }).then(function(results) {
      shouldBuildWith(results.directory, {
        options: [
          // 'addTest', // Done differently
          '_domPrefixes',
          'hasEvent',
          '_prefixes',
          'testAllProps',
          'testProp',
          'testStyles',
        ]
      });
    });
  });
});
