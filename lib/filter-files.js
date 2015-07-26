var Filter = require('broccoli-filter');

var defaultOptions = require('./default-options');
var merge = require('deepmerge');
var modernizr = require('modernizr');
var path = require('path');
var stripComments = require('strip-comments');

// var requiredDetects = [];

ModernizrFilter.prototype = Object.create(Filter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTree, options) {
  var metadata;

  options = merge(defaultOptions, options || {});

  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTree, options);
  }

  inputTree = inputTree || {};
  metadata = modernizr.metadata();

  // this.requiredDetects = [];
  // requiredDetects = []; // Reset

  this.inputTree = inputTree;
  this.options = options;
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

ModernizrFilter.prototype.parseForReferences = function(filePath, content) {
  var basename = path.basename(filePath);
  var requiredDetects = [];
  var options = this.options;
  var featureDetect, index, match, regex;

  if ((/\.js$/).test(basename)) {

    /* If no reference to Modernizr, skip the file */

    if (!(/Modernizr/im).test(content)) {
      return;
    }

    /* Else, find all the references */

    index = 2;
    regex = new RegExp(/\bModernizr(\.|\['|\[")([a-zA-Z.]+)\b/g);

  } else {

    /* Add the list of possible CSS classes to the regex */

    cssClassList = this.regexReadyCssClassList;
    index = 1;
    prefix = options.extensibility.cssclassprefix || '';

    if (prefix.length) {
      prefix += '-';
    }

    regex = new RegExp('(?:\\.' + prefix + ')(?:no-)?(' + cssClassList + ')(?=[\\W])', 'gm');

  }

  /* For each reference, add it to the list of detections */

  match = (regex).exec(content);

  while (match) {
    featureDetect = match[index];

    // console.log(featureDetect);

    if (requiredDetects.indexOf(featureDetect) === -1) {
      requiredDetects.push(featureDetect);
    }

    match = (regex).exec(content);
  }

  return requiredDetects;
};

ModernizrFilter.prototype.write = function(readTree) {
  console.log('WRITE:', readTree);
}

ModernizrFilter.prototype.processString = function(content, relativePath) {
  var cleanContent = stripComments(content);

  return this.parseForReferences(relativePath, cleanContent);

  // return this.requiredDetects;
};

module.exports = ModernizrFilter;
// exports.requiredDetects = requiredDetects;
