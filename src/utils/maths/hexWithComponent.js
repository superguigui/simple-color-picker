module.exports = function hexWithComponent(hex, componentIndex, value) {
  return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
};