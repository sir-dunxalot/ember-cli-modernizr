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
  this.metadata = metadata;
  this.options = options;
  this.requiredConfig = {
    classPrefix: this.cssClassPrefix,
    'feature-detects': [],
    options: [],
  };

  /* Create a list of css classes to look for in stylesheets */

  this.featureDetectsMap = metadata.reduce(function(featureDetectsMap, featureDetect, i) {
    var cssClass = featureDetect.cssclass;
    var builderAliases = featureDetect.builderAliases;
    var builderAlias = builderAliases ? builderAliases[0] : featureDetect.property;

    if (typeof cssClass === 'object') {
      cssClass.forEach(function(className) {
        featureDetectsMap[className] = builderAlias;
      });
    } else {
      featureDetectsMap[cssClass] = builderAlias;
    }

    return featureDetectsMap;
  }, {}); // Start with {}

  /* Create a string with each value seperated by a regex 'or' operator */

  this.regexReadyCssClassList = Object.keys(this.featureDetectsMap).join('|');

  return CachingWriter.apply(this, arguments);
};

ModernizrFilter.prototype.extensions = ['css', 'js', 'html'];

ModernizrFilter.prototype.parseForReferences = function(filePath, content) {
  var basename = path.basename(filePath);
  var featureDetectsMap = this.featureDetectsMap;
  var options = this.options;
  var requiredConfig = this.requiredConfig;
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
    builderAlias = featureDetectsMap[featureDetect];

    if (builderAlias) {

      /* If alias exists, add it to the builder requirements as a feature */

      if (this.requiredConfig['feature-detects'].indexOf(builderAlias) === -1) {
        this.requiredConfig['feature-detects'].push(builderAlias);
      }
    } else {

      /* Else, assume it's an option */

      if (this.requiredConfig.options.indexOf(featureDetect) === -1) {
        this.requiredConfig.options.push(featureDetect);
      }
    }

    match = (regex).exec(content);
  }

  return content;
};

ModernizrFilter.prototype.updateCache = function(srcDir, destDir) {
  var filePaths = walkSync(srcDir);
  var requiredConfig;

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

  requiredConfig = this.requiredConfig;

  /* Remove leading underscores from options */

  requiredConfig.options = requiredConfig.options.map(function(option) {
    if (option.charAt(0) === '_') {
      option = option.substr(1);
    }

    return option;
  });

  console.log(requiredConfig);

  modernizr.build(requiredConfig, function(result) {
    console.log(result);
  });
};

module.exports = ModernizrFilter;
