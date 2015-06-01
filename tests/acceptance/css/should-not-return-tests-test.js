var chai = require('chai');
var readFixture = require('../../helpers/read-fixture');
var root = process.cwd();

/* Test helpers */

var assert = chai.assert;

describe('Acceptance - Should not return tests (CSS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  it('should not detect features in comments', function() {
    var content = readFixture('should-not-return-tests/css/comments.css');
  });
});
