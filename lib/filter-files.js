var CachingWriter = require('broccoli-caching-writer');
var configAll = require('./config-all');
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

function ModernizrFilter(inputTrees, modernizrConfig) {
  var presetModernizrOptions = modernizrConfig.options;
  var requiredOptions = [];
  var metadata;

  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTrees, modernizrConfig);
  }

  inputTrees = inputTrees || {};
  metadata = modernizr.metadata();

  for (var option in presetModernizrOptions) {
    if (presetModernizrOptions[option]) {
      requiredOptions.push(option);
    }
  }

  this.classPrefix = modernizrConfig.classPrefix;
  this.inputTrees = inputTrees;
  this.metadata = metadata;
  this.modernizrConfig = modernizrConfig;
  this.requiredConfig = {
    classPrefix: modernizrConfig.classPrefix,
    'feature-detects': modernizrConfig['feature-detects'],
    options: requiredOptions,
  };

  /* Create a list of css classes to look for in stylesheets */

  this.featureDetectsMap = metadata.reduce(function(featureDetectsMap, featureDetect, i) {
    var cssClass = featureDetect.cssclass;
    var amdPath = featureDetect.amdPath;

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

  /* Remove comments */

  content = stripComments(content);

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
    prefix = this.classPrefix;

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

  return this.requiredConfig;
};

ModernizrFilter.prototype.updateCache = function(srcDir, destDir) {
  var appOutputPaths = this.appOutputPaths;
  var filePaths = walkSync(srcDir);
  var inputTrees = this.inputTrees;
  var modernizrConfig = this.modernizrConfig;
  var outputDir = path.join(destDir, modernizrConfig.outputDir);
  var outputPath = path.join(outputDir, modernizrConfig.outputFileName + '.js');
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

      this.parseForReferences(filePath, content);
    }
  }, this);

  requiredConfig = this.requiredConfig;

  /* If no references were detected, don't write the file */

  if (!requiredConfig['feature-detects'].length && !requiredConfig.options.length) {
    return;
  }

  /* If the output dir doesn't exist, make it before writing */

  if (!fs.exists(outputDir)) {
    mkdirp.sync(outputDir);
  }

  modernizr.build(this.requiredConfig, function(result) {
    fs.writeFileSync(outputPath, result, fileOptions);
  });
};

module.exports = ModernizrFilter;
