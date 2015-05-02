'use strict';

var isNumber = require('is-number');
var isObject = require('is-object');
var isArray = require('is-array');

var hexNumberToHexString = require('./utils/maths/hexNumberToHexString');
var hex2rgb = require('./utils/maths/hex2rgb');
var rgb2hsv = require('./utils/maths/rgb2hsv');
var hsv2rgb = require('./utils/maths/hsv2rgb');
var rgb2hex = require('./utils/maths/rgb2hex');
var perceivedBrightness = require('./utils/maths/perceivedBrightness');

function Color(value) {
  if(isArray(value) && value.length === 3) {
    this.setRGB(value[0], value[1], value[2]);
  }
  else if(isObject(value)) {
    if(value.hasOwnProperty('r') && value.hasOwnProperty('g') && value.hasOwnProperty('b')) {
      this.setRGB(value.r, value.g, value.b);
    }
    else if(value.hasOwnProperty('h') && value.hasOwnProperty('s') && value.hasOwnProperty('v')) {
      this.setHSV(value.h, value.s, value.v);
    }
    else {
      throw new Error('Incorrect color format');
    }
  }
  else {
    this.setHex(value);
  }
}

module.exports = Color;

Object.defineProperties(Color.prototype, {
  'h': { 
    get: function() {
      return this.hsv.h; 
    },
    set: function(value) {
      this.hsv.h = value;
      this._updateFromHSV();
    }
  },
  's': { 
    get: function() { 
      return this.hsv.s; 
    },
    set: function(value) {
      this.hsv.s = value;
      this._updateFromHSV();
    }
  },
  'v': { 
    get: function() { 
      return this.hsv.v; 
    },
    set: function(value) {
      this.hsv.v = value;
      this._updateFromHSV();
    }
  },
  'r': { 
    get: function() {
      return this.rgb.r; 
    },
    set: function(value) {
      this.rgb.r = value;
      this._updateFromRGB();
    }
  },
  'g': { 
    get: function() { 
      return this.rgb.g; 
    },
    set: function(value) {
      this.rgb.g = value;
      this._updateFromRGB();
    }
  },
  'b': { 
    get: function() { 
      return this.rgb.b; 
    },
    set: function(value) {
      this.rgb.b = value;
      this._updateFromRGB();
    }
  }
});

Color.prototype.isDark = function() {
  return perceivedBrightness(this.rgb.r, this.rgb.g, this.rgb.b) < 128;
};

Color.prototype.isLight = function() {
  return !this.isDark();
};

Color.prototype.setRGB = function(r, g, b) {
  this.rgb = {
    r: r,
    g: g,
    b: b
  };
  this._updateFromRGB();
};

Color.prototype.setHSV = function(h, s, v) {
  this.hsv = {
    h: h,
    s: s,
    v: v
  };
  this._updateFromHSV();
};

Color.prototype.setHex = function(hex) {
  if(isNumber(hex)) {
    this.hex = hexNumberToHexString(hex);
  }
  else {
    this.hex = String(hex).toUpperCase();
  }
  this._updateFromHex();
};

Color.prototype.clone = function() {
  return new Color(this.hex);
};

Color.prototype._updateFromHSV = function() {
  this.rgb = hsv2rgb(this.hsv.h, this.hsv.s, this.hsv.v);
  this.setHex(rgb2hex(this.rgb.r, this.rgb.g, this.rgb.b));
};

Color.prototype._updateFromRGB = function() {
  var h = this.hsv ? this.hsv.h : 0;
  this.setHex(rgb2hex(this.rgb.r, this.rgb.g, this.rgb.b));
  this.hsv = rgb2hsv(this.rgb.r, this.rgb.g, this.rgb.b);
  if(isNaN(this.hsv.h)) {
    this.hsv.h = h;
  }
};

Color.prototype._updateFromHex = function() {
  var h = this.hsv ? this.hsv.h : 0;
  this.rgb = hex2rgb(this.hex);
  this.hsv = rgb2hsv(this.rgb.r, this.rgb.g, this.rgb.b);
  if(isNaN(this.hsv.h)) {
    this.hsv.h = h;
  }
};

