var CachingWriter = require('broccoli-caching-writer');

var configAll = require('./config-all');
var defaultOptions = require('./default-options');
var fs = require('fs');
var merge = require('deepmerge');
var mkdirp = require('mkdirp');
var modernizr = require('modernizr');
var path = require('path');
var stripComments = require('strip-comments');
var walkSync = require('walk-sync');

var fileOptions = { encoding: 'utf8' };

ModernizrFilter.prototype = Object.create(CachingWriter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTrees, options) {
  var metadata;

  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTrees, options);
  }

  inputTrees = inputTrees || {};
  metadata = modernizr.metadata();
  options = merge(defaultOptions, options || {});

  this.cssClassPrefix = options.extensibility.cssclassprefix || '';
  this.inputTrees = inputTrees;
  this.options = options;
  this.requiredDetects = [];

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

  return CachingWriter.apply(this, arguments);
};

ModernizrFilter.prototype.extensions = ['css', 'js', 'html'];

ModernizrFilter.prototype.getRequiredConfig = function() {
  var requiredDetects = this.requiredDetects;
  var options = configAll.options;
  var config = {
    classPrefix: this.cssClassPrefix,
    'feature-detects': [],
    options: [],
  };

  requiredDetects.forEach(function(featureDetect) {

    /* Remove leading underscores */

    while(featureDetect.charAt(0) === '_') {
      featureDetect = featureDetect.substr(1);
    }

    /* Then organize the detections as required by Modernizr */

    if (options.indexOf(featureDetect) > -1) {
      config.options.push(featureDetect);
    } else {
      config['feature-detects'].push(featureDetect);
    }
  });

  return config;
};

ModernizrFilter.prototype.parseForReferences = function(filePath, content) {
  var basename = path.basename(filePath);
  // var requiredDetects = [];
  var options = this.options;
  var featureDetect, index, match, regex;

  if ((/\.map$/).test(basename)) {
    return content;
  } else if ((/\.js$/).test(basename)) {

    /* If no reference to Modernizr, skip the file */

    if (!(/Modernizr/im).test(content)) {
      return;
    }

    /* Else, find all the references */

    index = 2;
    regex = new RegExp(/\bModernizr(\.|\['|\[")(\w+?)\b/g);

  } else {

    /* Add the list of possible CSS classes to the regex */

    cssClassList = this.regexReadyCssClassList;
    index = 1;
    prefix = this.cssClassPrefix;

    if (prefix.length) {
      prefix += '-';
    }

    regex = new RegExp('(?:\\.' + prefix + ')(?:no-)?(' + cssClassList + ')(?=[\\W])', 'gm');

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

  return content;
};

ModernizrFilter.prototype.updateCache = function(srcDir, destDir) {

  var filePaths = walkSync(srcDir);

  filePaths.forEach(function(filePath) {
    var srcPath  = path.join(srcDir[0], filePath);
    var isDirectory = srcPath.slice(-1) === '/';
    var dirPath, content, relativePath, templatePath;

    if (isDirectory) {
      dirPath = path.join(destDir, filePath);

       if (!fs.exists(dirPath)) {
        mkdirp.sync(dirPath);
      }
    } else {
      content = fs.readFileSync(srcPath, fileOptions);
      cleanContent = stripComments(content);

      this.parseForReferences(filePath, cleanContent);
    }
  }, this);

  console.log(this.getRequiredConfig());

  // modernizr.build(this.getRequiredConfig(), function(result) {
  //   console.log(result);
  // });

  // return content;
};

module.exports = ModernizrFilter;
