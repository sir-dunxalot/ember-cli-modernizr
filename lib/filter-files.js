var customizr = require('customizr');
var Filter = require('broccoli-filter');

ModernizrFilter.prototype = Object.create(Filter.prototype);
ModernizrFilter.prototype.constructor = ModernizrFilter;

function ModernizrFilter(inputTree, options) {
  if (!(this instanceof ModernizrFilter)) {
    return new ModernizrFilter(inputTree, options);
  }

  console.log('HERE');

  options = options || {};

  this.inputTree = inputTree;

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

//   console.log('OK');

//   return readTree(this.inputTree).then(function(srcDir) {
//     console.log(srcDir);
//     return Filter.prototype.write.call(_this, readTree, destDir);
//   });
// };

ModernizrFilter.prototype.processString = function(content, relativePath) {
  console.log(content);

  return content;
};

module.exports = ModernizrFilter;
