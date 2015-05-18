var filterFiles = require('./lib/filter-files');
var modernizr = require('modernizr');

/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-modernizr',
  inDevelopment: false,

  included: function(app) {
    var environment = app.env;
    var inDevelopment = environment === 'development';

    this._super.included(app);

    if (inDevelopment) {
      app.import(app.bowerDirectory + '/modernizr/modernizr.js');
    }

    this.inDevelopment = inDevelopment;
  },

  postprocessTree: function(type, workingTree) {
    return filterFiles(workingTree);
  },
};
