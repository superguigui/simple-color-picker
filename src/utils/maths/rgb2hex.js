var hexWithComponent = require('./hexWithComponent');

module.exports = function rgb2hex(r, g, b) {

  var hex = hexWithComponent(0, 2, r);
  hex = hexWithComponent(hex, 1, g);
  hex = hexWithComponent(hex, 0, b);
  return hex;
  
};