var emberCliModernizr = require('../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

describe('Acceptance - Extensibility', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('detects multiple Modernizr.addTest methods', function() {
    shouldDetect('extensibility/add-test-multiple.js', ['addTest']);
  });

  it('detects a single Modernizr.addTest method', function() {
    shouldDetect('extensibility/add-test-single.js', ['addTest']);
  });

  it('detects the Modernizr._domPrefixes API', function() {
    shouldDetect('extensibility/dom-prefixes.js', ['_domPrefixes']);
  });

  it('detects the Modernizr.hasEvent API', function() {
    shouldDetect('extensibility/has-event.js', ['hasEvent']);
  });

  it('detects the Modernizr._prefixes API', function() {
    shouldDetect('extensibility/prefixes.js', ['_prefixes']);
  });

  it('detects the Modernizr.testAllProps API', function() {
    shouldDetect('extensibility/test-all-props.js', ['testAllProps']);
  });

  it('detects the Modernizr.testProp API', function() {
    shouldDetect('extensibility/test-prop.js', ['testProp']);
  });

  it('detects the Modernizr.testStyles API', function() {
    shouldDetect('extensibility/test-styles.js', ['testStyles']);
  });

  it('can build a Modernizr file with the correct extensibility detections', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/extensibility'
    }).then(function(results) {
      shouldBuildWith(directory, [
        'addTest',
        '_domPrefixes',
        'hasEvent',
        '_prefixes',
        'testAllProps',
        'testProp',
        'testStyles',
      ]);
    });
  });
});
