module.exports = function perceivedBrightness(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000;
};