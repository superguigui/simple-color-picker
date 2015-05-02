module.exports = function componentFromHex(hex, componentIndex) {
  return (hex >> (componentIndex * 8)) & 0xFF;
};