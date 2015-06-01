var fs = require('fs');
var path = require('path');

function readFixture(srcDir, fixturePath) {
  var srcPath = path.join(srcDir, fixturePath);

  console.log('PATH:', srcPath);

  return fs.readFileSync(srcPath, {
    encoding: 'utf8'
  });
}

module.exports = readFixture;
