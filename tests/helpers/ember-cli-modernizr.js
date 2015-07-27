var broccoli = require('broccoli');
var defaultFor = require('../../lib/utils/default-for');
var defaultConfig = require('../../lib/default-config');
var emberCliModernizr = require('../..'); // index.js

/**
Test-friendly helpers that wrapp the addon's index.js
file's Ember addon methods like included and postprocessTree.
This allows us to call the methods from tests easily.

This also keeps track of some options and properties (e.g.
builder), which are used from test to test and are used
in beforeEach and afterEach test hooks.
*/

module.exports = {
  builder: null,

  /**
  Provides direct access the the addon module source, the
  index.js file.

  @property module
  */

  module: emberCliModernizr,

  currentFixturesTree: null,

  /**
  Builds the assets to the dist file using emberCliModernizr
  options set (like the developer would do in the Brocfile).

  @method buildWithOptions
  */

  buildWithOptions: function(options, environment) {
    this.resetDefaultOptions();
    this.setOptions(options, environment);

    /* By default, we want all the fixtures */

    if (options && options.tree) {
      this.currentFixturesTree = options.tree;
    } else {
      this.currentFixturesTree = 'tests/fixtures';
    }

    this.builder = new broccoli.Builder(this.parseTree());

    return this.builder.build();
  },

  /**
  Takes the assets built in the dist directory (the dist tree)
  and passes it to the addon's postprocessTree hook as if
  it was called as part fo the Broccoli build process.

  @method parseTree
  @param {String} type 'all', 'js', or 'css'
  @param {String|Object} The Broccoli tree to parse
  */

  parseTree: function(type, tree) {
    type = defaultFor(type, 'all');
    tree = defaultFor(tree, this.currentFixturesTree);

    return emberCliModernizr.postprocessTree(type, tree);
  },

  /**
  Ensures the addon's options are reset to their original state.
  This is useful to run after each test of before a new Broccoli
  build takes place.

  @method resetDefaultOptions
  */

  resetDefaultOptions: function() {
    this.setOptions(defaultConfig);
  },

  /**
  Accepts an options object and environment to set in the
  addon's index.js file as if the included hook was being
  called as part of the Broccoli build process.

  @method setOptions
  @param {Object} options The object of options that would have otherwise been set in the Brocfile
  @param {String} environment The name of the environment to use ('development' or 'production')
  */

  setOptions: function(options, environment) {
    options = options || {};
    environment = environment || 'development';

    emberCliModernizr.included({
      env: environment,
      options: {
        modernizr: options
      }
    });
  },
}
