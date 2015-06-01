var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

describe('Acceptance - Extensibility', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('detects multiple Modernizr.addTest methods', function() {
    var content = readFixture('extensibility/add-test-multiple.js');
  });

  it('detects a single Modernizr.addTest method', function() {
    var content = readFixture('extensibility/add-test-single.js');
  });

  it('detects the Modernizr._domPrefixes API', function() {
    var content = readFixture('extensibility/dom-prefixes.js');
  });

  it('detects the Modernizr.hasEvent API', function() {
    var content = readFixture('extensibility/has-event.js');
  });

  it('detects the Modernizr._prefixes API', function() {
    var content = readFixture('extensibility/dom-prefixes.js');
  });

  it('detects the Modernizr.testAllProps API', function() {
    var content = readFixture('extensibility/test-all-props.js');
  });

  it('detects the Modernizr.testProp API', function() {
    var content = readFixture('extensibility/test-prop.js');
  });

  it('detects the Modernizr.testStyles API', function() {
    var content = readFixture('extensibility/test-styles.js');
  });
});
