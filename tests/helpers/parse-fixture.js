var ModernizrFilter = require('../../lib/filter-files');
var defaultConfig = require('../../lib/default-config');
var merge = require('deepmerge');
var readFixture = require('./read-fixture');

function parseFixture(fixturePath, modernizrConfig) {
  var content = readFixture(fixturePath);
  var testConfig = defaultConfig;
  var config, modernizrFilter, requiredConfig;

  testConfig['feature-detects'] = [];
  testConfig.options.setClasses = false;

  config = merge(testConfig, modernizrConfig || {});
  modernizrFilter = new ModernizrFilter({}, config);
  requiredConfig = modernizrFilter.parseForReferences(fixturePath, content);

  // console.log(requiredConfig);

  return requiredConfig;
}

module.exports = parseFixture;
