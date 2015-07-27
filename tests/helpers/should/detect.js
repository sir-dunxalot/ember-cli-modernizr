var chai = require('chai');
var parseFixture = require('../parse-fixture');
var assert = chai.assert;

function shouldDetect(fixturePath, expectedConfig, modernizrConfig) {
  var actualConfig = parseFixture(fixturePath, modernizrConfig) || [];
  var actualFeatureDetects = actualConfig['feature-detects'];
  var actualOptionDetects = actualConfig.options;

  var expectedFeatureDetectsLength;
  var expectedOptionDetectsLength;

  if (typeof expectedConfig === 'object') {
    expectedConfig = {
      'feature-detects': expectedConfig,
      options: [],
    }
  }


  expectedFeatureDetectsLength = expectedConfig['feature-detects'].length;
  expectedOptionDetectsLength = expectedConfig.options.length;

  expectedConfig['feature-detects'] = expectedConfig['feature-detects'].map(function(featureDetect) {
    return 'test/' + featureDetect;
  });

  expectedConfig['feature-detects'].forEach(function(featureDetect) {

    assert.include(actualFeatureDetects, featureDetect,
      'Should detect the ' + featureDetect + ' feature');

  });

  expectedConfig.options.forEach(function(option) {

    assert.include(actualOptionDetects, option,
      'Should detect the ' + option + ' option');

  });

  assert.strictEqual(expectedFeatureDetectsLength, expectedConfig['feature-detects'].length,
    'Should detect ' + expectedFeatureDetectsLength + 'features');

  assert.strictEqual(expectedOptionDetectsLength, expectedConfig.options.length,
    'Should detect ' + expectedOptionDetectsLength + 'options');

}

module.exports = shouldDetect;
