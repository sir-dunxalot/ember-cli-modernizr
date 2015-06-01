var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

describe('Acceptance - Should not return tests (JS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('should not detect features in comments', function() {
    var content = readFixture('should-not-return-tests/js/comments.js');
  });

  it('should not detect features as method names', function() {
    var content = readFixture('should-not-return-tests/js/methods.js');
  });

  it('should detect features as property names or values', function() {
    var content = readFixture('should-not-return-tests/js/properties.js');
  });
});
