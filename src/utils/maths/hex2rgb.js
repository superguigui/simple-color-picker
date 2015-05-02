var componentFromHex = require('./componentFromHex');

module.exports = function hex2rgb(hex) {

  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  
  return {
    r: componentFromHex(bigint, 2),
    g: componentFromHex(bigint, 1),
    b: componentFromHex(bigint, 0)
  };

};