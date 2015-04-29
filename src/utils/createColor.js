var isNumber = require('is-number');
var Color = require('color');

module.exports = function createColor(color) {
  if(isNumber(color)) {
    color = '#' + color.toString(16);
  }
  return Color(color || '#FFFFFF');
};