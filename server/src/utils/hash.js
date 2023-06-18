const crypto = require('crypto');

exports.hashString = (inputString) => {
  const hash = crypto.createHash('sha512');
  hash.update(inputString);
  return hash.digest('hex');
}

exports.isHashMatching = (inputString, hashedString) => {
  const hash = crypto.createHash('sha512');
  hash.update(inputString);
  const hashedInputString = hash.digest('hex');
  
  return hashedInputString === hashedString;
}