'use strict';

module.exports = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};