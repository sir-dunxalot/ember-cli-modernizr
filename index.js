var defaultFor = require('./lib/utils/default-for');
var defaultOptions = require('./lib/default-options');
var filterFiles = require('./lib/filter-files');
var merge = require('deepmerge');
var modernizr = require('modernizr');

/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-modernizr',
  inDevelopment: false,
  options: null,

  included: function(app) {
    var environment = app.env;
    var inDevelopment = environment === 'development';
    var passedOptions = defaultFor(app.options.modernizr, {});
    var developmentPath;

    this.options = merge(defaultOptions, passedOptions);

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

  postprocessTree: function(type, workingTree) {
    return filterFiles(workingTree, this.options);
  },
};
