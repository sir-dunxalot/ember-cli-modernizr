var defaultFor = require('./lib/utils/default-for');
var defaultConfig = require('./lib/default-config');
var developmentConfig = require('./lib/config-all');
var filterFiles = require('./lib/filter-files');
var fs = require('fs');
var merge = require('deepmerge');
var mergeTrees = require('broccoli-merge-trees');
var modernizr = require('modernizr');

/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-modernizr',
  modernizrConfig: null,
  shouldParseFiles: null,

  contentFor: function(type) {
    var modernizrConfig, outputDir, outputFileName;

    if (type === 'body-footer' && this.shouldParseFiles) {
      modernizrConfig = this.modernizrConfig;
      outputDir = modernizrConfig.outputDir;
      outputFileName = modernizrConfig.outputFileName;

      return '<script src="/' + outputDir + '/' + outputFileName + '.js"></script>';
    }
  },

  included: function(app) {
    var environment = app.env;
    var inProduction = environment === 'production';
    var passedOptions = defaultFor(app.options.modernizr, {});

    /* Set outputPaths for use writing file */

    defaultConfig.appOutputPaths = app.options.outputPaths;

    /* Merge default options with user-specified options */

    this.modernizrConfig = merge(defaultConfig, passedOptions);
    this.shouldParseFiles = this.modernizrConfig.shouldParseFiles || inProduction;

    if (!this.shouldParseFiles) {
      app.import('vendor/modernizr-development.js');
    }
  },

  postprocessTree: function(type, tree) {
    var filteredTree;

    if (type === 'all' && this.shouldParseFiles) {
      modernizrTree = filterFiles(tree, this.modernizrConfig);

      return mergeTrees([tree, modernizrTree], {
        overwrite: true
      });
    } else {
      return tree;
    }
  },

};
