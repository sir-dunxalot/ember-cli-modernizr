var defaultFor = require('./lib/utils/default-for');
var defaultConfig = require('./lib/default-config');
var filterFiles = require('./lib/filter-files');
var merge = require('deepmerge');
var mergeTrees = require('broccoli-merge-trees');
var modernizr = require('modernizr');

/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-modernizr',
  inDevelopment: false,
  modernizrConfig: null,

  contentFor: function(type) {
    var modernizrConfig, outputDir, outputFileName;

    if (type === 'body-footer') {
      modernizrConfig = this.modernizrConfig;
      outputDir = modernizrConfig.outputDir;
      outputFileName = modernizrConfig.outputFileName;

      return '<script src="/' + outputDir + '/' + outputFileName + '.js"></script>';
    }
  },

  included: function(app) {
    var environment = app.env;
    var inDevelopment = environment === 'development';
    var passedOptions = defaultFor(app.options.modernizr, {});
    var developmentPath;

    /* Set outputPaths for use writing file */

    defaultConfig.appOutputPaths = app.options.outputPaths;

    /* Merge default options with user-specified options */

    this.modernizrConfig = merge(defaultConfig, passedOptions);

    if (inDevelopment) {
      developmentPath = defaultFor(
        passedOptions.developmentPath,
        app.bowerDirectory + '/modernizr/modernizr.js'
      );

      // app.import(developmentPath); // TODO
    } else {

    }

    this.inDevelopment = inDevelopment;
  },

  postprocessTree: function(type, tree) {
    var filteredTree;

    if (type === 'all') {
      modernizrTree = filterFiles(tree, this.modernizrConfig);

      return mergeTrees([tree, modernizrTree], {
        overwrite: true
      });
    } else {
      return tree;
    }
  },

};
