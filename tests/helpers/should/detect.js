var chai = require('chai');
var parseFixture = require('../parse-fixture');
var assert = chai.assert;

function shouldDetect(fixturePath, expectedDetections) {
  var detections = parseFixture(fixturePath);
  var expectedDetectionsLength = expectedDetections.length;

  expectedDetections.forEach(function(feature) {
    assert.include(detections, feature,
      'Should detect the ' + feature + ' feature');
  });

  assert.strictEqual(detections.length, expectedDetectionsLength,
    'Should detect ' + expectedDetectionLength + 'features');
}

module.exports = shouldDetect;
