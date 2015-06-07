var FilterFiles = require('../../lib/filter-files');
var readFixture = require('./read-fixture');

function parseFixture(fixturePath) {
  var content = readFixture(fixturePath);
  var ModernizFilter = new FilterFiles();

  return ModernizFilter.processString(content, fixturePath);
}

module.exports = parseFixture;
