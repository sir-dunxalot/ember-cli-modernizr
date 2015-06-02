var emberCliModernizr = require('../../helpers/ember-cli-modernizr');
var shouldBuildWith = require('../../helpers/should/build-with');
var shouldDetect = require('../../helpers/should/detect');
var root = process.cwd();

describe('Acceptance - Extras', function() {

  beforeEach(function() {
    process.chdir(root);
  });

  afterEach(function() {
    if (emberCliModernizr.builder) {
      emberCliModernizr.builder.cleanup();
    }
  });

  it('should detect the Modernizr.mq API', function() {
    shouldDetect('extras/media-queries.js', ['mq']);
  });

  it('should detect a core Modernizr.load call', function() {
    shouldDetect('extras/core-load.js',
      ['load', 'geolocation', 'csstransitions']
    );
  });

  it('should detect a non-core Modernizr.load call', function() {
    shouldDetect('extras/non-core-load.js',
      ['load', 'cors', 'cssvhunit']
    );
  });

  it('should build a Modernizr file with the correct extras', function() {
    return emberCliModernizr.buildWithOptions({
      tree: 'tests/fixtures/extras'
    }).then(function(results) {
      shouldBuildWith(directory, [
        'mq', // API
        'load', // API
        'geolocation', // Core
        'csstransitions', // Core
        'core', // Non-core
        'cssvhunit', // Non-core
      ]);
    });
  });

});
