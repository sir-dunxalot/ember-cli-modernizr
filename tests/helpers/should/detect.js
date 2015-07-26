var chai = require('chai');
var parseFixture = require('../parse-fixture');
var assert = chai.assert;

function shouldDetect(fixturePath, expectedDetections, options) {
  var detections = parseFixture(fixturePath, options);
  var expectedDetectionsLength = expectedDetections.length;

  console.log(detections);

  expectedDetections.forEach(function(feature) {

    assert.include(detections, feature,
      'Should detect the ' + feature + ' feature');

  });

  assert.strictEqual(detections.length, expectedDetectionsLength,
    'Should detect ' + expectedDetectionsLength + 'features');
}

module.exports = shouldDetect;
