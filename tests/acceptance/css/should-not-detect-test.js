var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

describe('Acceptance - Should not detect features (CSS)', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should not detect features in comments', function() {
    shouldDetect('should-not-detect/js/comments.js', []);
  });

  it('should not build a Modernizr file when there are no detects', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-not-detect/css'
    }).then(function(results) {
      shouldBuildWith(results.directory, []);
    });
  });

});
