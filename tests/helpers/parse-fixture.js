var ModernizrFilter = require('../../lib/filter-files');
var readFixture = require('./read-fixture');

function parseFixture(fixturePath) {
  var content = readFixture(fixturePath);

  return ModernizrFilter.processString(content);
}

module.exports = parseFixture;
