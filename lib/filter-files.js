var Filter = require('broccoli-filter');

var customizr = require('customizr');
var config = require('./config-all');
var defaultOptions = require('./default-options');
var merge = require('deepmerge');
var modulizr = require('./modulizr');
var modernizr = require('modernizr');
var path = require('path');
var stripComments = require('strip-comments');

/* Deferreds */
var promise = require('promised-io/promise');

/* Custom Tests CSS Map */
var cssMap = require('./_custom-classes');
var cssClasses = cssMap.classes;

/* Modulizr build tool */
var Modulizr = require('./modulizr').Modulizr;

ModernizrFilter.prototype = Object.create(Filter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTree, options) {
  var metadata;

  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTree, options);
  }

  inputTree = inputTree || {};
  metadata = modernizr.metadata();
  options = options || {};

  this.requiredDetects = [];
  this.inputTree = inputTree;
  this.options = merge(defaultOptions, options);
  this.stringMatches = {};

  /* Create a list of css classes to look for in stylesheets */

  this.cssClassList = metadata.reduce(function(cssClassList, featureDetect, i) {
    cssClass = featureDetect.cssclass;

    if (typeof cssClass === 'object') {
      cssClass.forEach(function(className) {
        cssClassList.push(className);
      });
    } else {
      cssClassList.push(cssClass);
    }

    return cssClassList;
  }, []); // Start with []

  /* Create a string with each value seperated by a regex 'or' operator */

  this.regexReadyCssClassList = this.cssClassList.join('|');
};

ModernizrFilter.prototype.extensions = ['js'];
ModernizrFilter.prototype.targetExtension = 'js';

ModernizrFilter.prototype.findStringMatches = function(filePath, content) {
  var basename = path.basename(filePath);
  var options = this.options;
  var featureDetect, index, match, possibleFeatureDetects, regex;

  if ((/\.js$/).test(basename)) {

    /* If no reference to Modernizr, skip the file */

    if (!(/Modernizr/im).test(content)) {
      return;
    }

    /* Else, find all the references */

    index = 2;
    regex = new RegExp(/\bModernizr(\.|\['|\[")(.+?)\b/g);


  } else {

    /* Add the list of possible CSS classes to the regex */

    cssClassList = this.regexReadyCssClassList;
    index = 1;
    prefix = options.extensibility.cssclassprefix || '';
    regex = new RegExp('(?:\\.' + prefix + ')(?:no-)?(' + cssClassList + ')(?![\\w-])', 'gm');
  }

  /* For each reference, add it to the list of detections */

  match = (regex).exec(content);

  while (match) {
    featureDetect = match[index];

    if (this.requiredDetects.indexOf(featureDetect) === -1) {
      this.requiredDetects.push(featureDetect);
    }

    match = (regex).exec(content);
  }

  return this.requiredDetects;
};

ModernizrFilter.prototype.write = function(readTree, destDir) {
  console.log('LIST:', this.requiredDetects);
  // var _this = this;

  // return readTree(this.inputTree).then(function (srcDir) {
  //   return Filter.prototype.write.call(_this, readTree, destDir)
  // }).finally(function() {
  //   var options = {
  //     dest: '/vendor/modernizr.js',
  //     files: {
  //       src: filesToCrawl
  //     }
  //   };

  //   customizr(options, function() {
  //     console.log(arguments);
  //   });
  // });
};

ModernizrFilter.prototype.processString = function(content, relativePath) {
  var cleanContent = stripComments(content);
  var matches = this.findStringMatches(relativePath, cleanContent);

  console.log(matches);
};

module.exports = ModernizrFilter;
