module.exports = function hexNumberToHexString(number) {
  return '#' + ('00000' + (number | 0).toString(16)).substr(-6).toUpperCase();
};