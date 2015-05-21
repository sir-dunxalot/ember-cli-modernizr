var customizr = require('customizr');
var modulizr = require('./modulizr');
var Filter = require('broccoli-filter');
var path = require('path');
var _defaults = require('./default-options'),

var filesToCrawl = [];

ModernizrFilter.prototype = Object.create(Filter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTree, type, options) {
  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTree, options);
  }
  console.log(type);

  options = options || {};

  this.inputTree = inputTree;
  console.log(inputTree);

  // for (var key in options) {
  //   if (options.hasOwnProperty(key)) {
  //     this[key] = options[key]
  //   }
  // }
};

ModernizrFilter.prototype.extensions = ['js'];
ModernizrFilter.prototype.targetExtension = 'js';

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
  var ized = modulizr.ize(content, []);
  console.log(content.length, ized.length, 'hi!');
  // return content;
};

module.exports = ModernizrFilter;
