var fs = require('fs');
var path = require('path');

function readFixture(fixturePath) {
  var srcDir = process.cwd();
  var srcPath = path.join(srcDir, '/tests/fixtures/', fixturePath);

  return fs.readFileSync(srcPath, {
    encoding: 'utf8'
  });
}

module.exports = readFixture;
