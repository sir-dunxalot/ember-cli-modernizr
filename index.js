var defaultFor = require('./lib/utils/default-for');
var filterFiles = require('./lib/filter-files');
var modernizr = require('modernizr');

var defaultOptions = {
  customTests: [],
  developmentPath: null,

  extensibility: {
    addtest: false,
    prefixed: false,
    teststyles: false,
    testprops: false,
    testallprops: false,
    hasevents: false,
    prefixes: false,
    domprefixes: false,
    cssclassprefix: ''
  },

  extra: {
    shiv: true,
    printshiv: false,
    load: true,
    mq: false,
    cssclasses: true
  },

  uglify: true,
  tests: [], // Tests you want to implicitly include
};

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
    var deveplomentPath;

    this._super.included(app);

    if (inDevelopment) {
      deveplomentPath = defaultFor(
        passedOptions.developmentPath,
        app.bowerDirectory + '/modernizr/modernizr.js'
      );

      app.import(developmentPath);
    } else {

    }

    this.inDevelopment = inDevelopment;
  },

  postprocessTree: function(type, workingTree) {
    return filterFiles(workingTree);
  },
};
