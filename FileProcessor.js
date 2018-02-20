const fs = require('fs');
const writeResult = (result) => {
  const text = fs.readFileSync('stats.txt', 'utf8');
  fs.writeFileSync('stats.txt', text + '\n' + result);
}

const readStats = () => {
  return fs.readFileSync('stats.txt', 'utf8');
}

module.exports.writeResult = writeResult;
module.exports.readStats = readStats;
