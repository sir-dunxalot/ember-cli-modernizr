var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

describe('Acceptance - shouldParseFiles', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should not build a Modernizr file when shouldParseFiles is false', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/should-detect/js',
      shouldParseFiles: false
    }).then(function(results) {
      shouldBuildWith(results.directory);
    });
  });
});
