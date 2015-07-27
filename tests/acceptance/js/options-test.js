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
    shouldDetect('should-detect/js/options/add-test-multiple.js', {
      options: ['addTest']
    });
  });

  it('should detect a single Modernizr.addTest method', function() {
    shouldDetect('should-detect/js/options/add-test-single.js', {
      options: ['addTest']
    });
  });

  it('should detect the Modernizr._domPrefixes API', function() {
    shouldDetect('should-detect/js/options/dom-prefixes.js', {
      options: ['domPrefixes']
    });
  });

  it('should detect the Modernizr.hasEvent API', function() {
    shouldDetect('should-detect/js/options/has-event.js', {
      options: ['hasEvent']
    });
  });

  it('should detect the Modernizr._prefixes API', function() {
    shouldDetect('should-detect/js/options/prefixes.js', {
      options: ['prefixes']
    });
  });

  it('should detect the Modernizr.testAllProps API', function() {
    shouldDetect('should-detect/js/options/test-all-props.js', {
      options: ['testAllProps']
    });
  });

  it('should detect the Modernizr.testProp API', function() {
    shouldDetect('should-detect/js/options/test-prop.js', {
      options: ['testProp']
    });
  });

  it('should detect the Modernizr.testStyles API', function() {
    shouldDetect('should-detect/js/options/test-styles.js', {
      options: ['testStyles']
    });
  });

  it('should detect the Modernizr.mq API', function() {
    shouldDetect('should-detect/js/options/media-queries.js', {
      options: ['mq']
    });
  });

  it('should detect a core Modernizr.load call', function() {
    shouldDetect('should-detect/js/options/core-load.js', {
      featureDetects: ['geolocation', 'css/transitions'],
      options: ['load']
    });
  });

  it('should detect a non-core Modernizr.load call', function() {
    shouldDetect('should-detect/js/options/non-core-load.js', {
      featureDetects: ['cors', 'css/vhunit'],
      options: ['load']
    });
  });

  it('should build a Modernizr file with the correct options', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/js/options'
    }).then(function(results) {
      shouldBuildWith(results.directory, {
        options: [
          'addTest',
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
