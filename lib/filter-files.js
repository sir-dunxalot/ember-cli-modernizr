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
    var amdPath = featureDetect.amdPath;
    // var builderAlias= builderAliases ? builderAliases[0] : featureDetect.property;

    if (typeof cssClass === 'object') {
      cssClass.forEach(function(className) {
        featureDetectsMap[className] = amdPath;
      });
    } else {
      featureDetectsMap[cssClass] = amdPath;
    }

    return featureDetectsMap;
  }, {}); // Start with {}

  /* Create a string with each value seperated by a regex 'or' operator */

  this.regexReadyCssClassList = Object.keys(this.featureDetectsMap).join('|');

  CachingWriter.apply(this, arguments);
};

ModernizrFilter.prototype.extensions = ['css', 'js', 'html'];

ModernizrFilter.prototype.parseForReferences = function(filePath, content) {
  var basename = path.basename(filePath);
  var featureDetectsMap = this.featureDetectsMap;
  var possibleOptions = configAll.options;
  var amdPath, featureDetect, index, match, regex;

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

    /* Remove leading underscores from options (e.g. _domPrefixes) */

    if (featureDetect.charAt(0) === '_') {
      featureDetect = featureDetect.substr(1);
    }

    /* If the feature is an option... */

    if (possibleOptions.indexOf(featureDetect) > -1) {

      if (this.requiredConfig.options.indexOf(featureDetect) === -1) {
        this.requiredConfig.options.push(featureDetect);
      }

    } else {

      /* Else, assume it's a feature and add it to the builder
      requirements as a feature */

      amdPath = featureDetectsMap[featureDetect];

      if (this.requiredConfig['feature-detects'].indexOf(amdPath) === -1) {
        this.requiredConfig['feature-detects'].push(amdPath);
      }
    }

    match = (regex).exec(content);
  }

  return content;
};

ModernizrFilter.prototype.updateCache = function(srcDir, destDir) {
  var appOutputPaths = this.appOutputPaths;
  var filePaths = walkSync(srcDir);
  var options = this.options;
  var outputDir = path.join(destDir, options.outputDir);
  var outputPath = path.join(outputDir, options.outputFileName + '.js');
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

  /* If the output dir doesn't exist, make it before writing */

  if (!fs.exists(outputDir)) {
    mkdirp.sync(outputDir);
  }

  modernizr.build(requiredConfig, function(result) {
    fs.writeFileSync(outputPath, result, fileOptions);
  });
};

module.exports = ModernizrFilter;
