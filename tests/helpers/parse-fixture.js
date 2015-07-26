var FilterFiles = require('../../lib/filter-files');
var readFixture = require('./read-fixture');

function parseFixture(fixturePath, options) {
  var content = readFixture(fixturePath);
  var ModernizrFilter = new FilterFiles({}, options || {});

  return ModernizrFilter.processString(content, fixturePath);
}

module.exports = parseFixture;
