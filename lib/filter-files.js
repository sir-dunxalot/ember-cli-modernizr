var Filter = require('broccoli-filter');

var customizr = require('customizr');
var defaultOptions = require('./default-options');
var merge = require('deepmerge');
var modulizr = require('./modulizr');
var path = require('path');
var stripComments = require('strip-comments');

/* Deferreds */
var promise = require('promised-io/promise');

/* Custom Tests CSS Map */
var cssMap = require('./_custom-classes');
var cssClasses = cssMap.classes;

/* Modulizr build tool */
var Modulizr = require('./modulizr').Modulizr;

var filesToCrawl = [];

ModernizrFilter.prototype = Object.create(Filter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTree, options) {
  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTree, options);
  }

  options = options || {};
  inputTree = inputTree || {};

  this.options = merge(defaultOptions, options);
  this.inputTree = inputTree;
  this.stringMatches = {};
};

ModernizrFilter.prototype.extensions = ['js'];
ModernizrFilter.prototype.targetExtension = 'js';

/* Parsing */
var getModuleByTest = function (test) {
  for (var key in _classes) {
    if (_classes.hasOwnProperty(key)) {
      // value is an array
      if (Object.prototype.toString.call(_classes[key]) === "[object Array]") {
        if (_classes[key].indexOf(test) !== -1) {
          return key;
        }
      }

      // value is not an array
      else if (_classes[key] === test) {
        return key;
      }
    }
  }
};

ModernizrFilter.prototype.findStringMatches = function(filePath, content) {
  var basename = path.basename(filePath);
  var options = this.options;
  var regex;

  if ((/\.js$/).test(basename)) {
    regex = new RegExp(/\bModernizr(\.|\['|\[")(.+?)\b/g);

    var results = regex.exec(content);

    console.log('RESULTS:', results);

    // Skip file if there's no reference to Modernizr in the content.
    if (!regex.test(content)) {
      skippedFiles++;
      return;
    }

    // console.log(RegExp.rightContext);

    // Match usage such as: Modernizr.classname --or-- Modernizr['classname']
    // regExp = new RegExp("(?:\\.|\\[(?:\"|'))(" + _class + ")(?![\\w-])(?:(?:\"|')\\])?", "gm");
  } else {
    // If it's not JS, assume it's CSS (or similar, e.g.: LESS, SCSS) files
    prefix = options.extensibility.cssclassprefix || '';
    // When no prefix, match usage such as: .classname --or-- .no-classname
    // When prefix set, match usage such as: .<prefix>classname --or-- .<prefix>no-classname
    regExp = new RegExp("(?:\\." + prefix + ")(?:no-)?(" + _class + ")(?![\\w-])", "gm");
  }

  // console.log(regExp.rightContext);
};

// ModernizrFilter.prototype.findStringMatches = function(_class, filePath, content) {
//   var basename = path.basename(filePath);
//   var options = this.options;
//   var skippedFiles = 0;
//   var match, regExp, prefix;

//   console.log(basename);

//   // JS files
//   if ((/\.js$/).test(basename)) {

//     // Skip file if there's no reference to Modernizr in the content.
//     if (!(/Modernizr/im).test(content)) {
//       skippedFiles++;
//       return;
//     }

//     // Match usage such as: Modernizr.classname --or-- Modernizr['classname']
//     regExp = new RegExp("(?:\\.|\\[(?:\"|'))(" + _class + ")(?![\\w-])(?:(?:\"|')\\])?", "gm");
//   } else {
//     // If it's not JS, assume it's CSS (or similar, e.g.: LESS, SCSS) files
//     prefix = options.extensibility.cssclassprefix || '';
//     // When no prefix, match usage such as: .classname --or-- .no-classname
//     // When prefix set, match usage such as: .<prefix>classname --or-- .<prefix>no-classname
//     regExp = new RegExp("(?:\\." + prefix + ")(?:no-)?(" + _class + ")(?![\\w-])", "gm");
//   }
//   match = (regExp).exec(content);

//   while (match) {
//     var test = match[1];

//     if (test) {
//       this.stringMatches[test] = this.stringMatches[test] || [];

//       if (this.stringMatches[test].indexOf(file) === -1) {
//         this.stringMatches[test].push(file);
//       }
//     }

//     match = (regExp).exec(content);
//   }
// };

// ModernizrFilter.prototype.write = function(readTree, destDir) {
//   var _this = this;

//   return readTree(this.inputTree).then(function (srcDir) {
//     return Filter.prototype.write.call(_this, readTree, destDir)
//   }).finally(function() {
//     var options = {
//       dest: '/vendor/modernizr.js',
//       files: {
//         src: filesToCrawl
//       }
//     };

//     customizr(options, function() {
//       console.log(arguments);
//     });
//   });
// };

ModernizrFilter.prototype.processString = function(content, relativePath) {
  var contentWithoutComments = stripComments(content);

  this.findStringMatches(relativePath, contentWithoutComments);
  // console.log(this.stringMatches);
  // var ized = modulizr.ize(content, []);
  // console.log(content.length, ized.length, 'hi!');
  // return content;
};

module.exports = ModernizrFilter;
