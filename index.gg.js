'use strict';

var bindAll = require('lodash.bindall');
var transform = require('dom-transform');
var Color = require('./src/Color');
var Emitter = require('component-emitter');
var isNumber = require('is-number');
var offset = require('./src/utils/dom/offset');
var clamp = require('./src/utils/maths/clamp');

function SimpleColorPicker(options) {
  // options
  options = options || {};
  this.color = null;
  this._hueColor = null;
  this.choosing = false;
  this.callbacks = [];

  // bind methods to scope (only if needed)
  bindAll(this, '_onSaturationMouseMove', '_onSaturationMouseDown', '_onSaturationMouseUp', '_onHueMouseDown', '_onHueMouseUp', '_onHueMouseMove');

  // dom template
  this._template = [
    '<div class="Scp-saturation">',
      '<div class="Scp-brightness"></div>',
      '<div class="Scp-sbSelector"></div>',
    '</div>',
    '<div class="Scp-hue">',
      '<div class="Scp-hSelector"></div>',
    '</div>'
  ].join('\n');

  // dom elements
  this.$el = document.createElement('div');
  this.$el.className = 'Scp';
  this.$el.innerHTML = this._template;

  this.$saturation = this.$el.querySelector('.Scp-saturation');
  this.$hue = this.$el.querySelector('.Scp-hue');
  this.$sbSelector = this.$el.querySelector('.Scp-sbSelector');
  this.$hSelector = this.$el.querySelector('.Scp-hSelector');

  // create event listeners
  this.$saturation.addEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.addEventListener('mousedown', this._onHueMouseDown);

  this.setSize(options.width || 175,  options.height || 150)

  // some styling and doming from options
  if (options.el) {
    this.appendTo(options.el);
  }
  if (options.background) {
    this.$el.style.padding = '5px';
    this.$el.style.background = new Color(options.background).hex;
  }
  
  this.setColor(options.color);

  return this;
}

Emitter(SimpleColorPicker.prototype);

/* ============================================================================= 
  Public API
============================================================================= */
SimpleColorPicker.prototype.setSize = function(width, height) {
  this.width = width;
  this.height = height;
  this.saturationWidth = this.width - 25;
  this.$el.style.width = this.width + 'px';
  this.$el.style.height = this.height + 'px';
  return this;
};

SimpleColorPicker.prototype.setColor = function(color) {
  this.color = new Color(color);
  this._hueColor = this.color.clone();

  this._hueColor.s = 1;
  this._hueColor.v = 1;
  if (this.color.s === 0) {
    this._hueColor.r = 255;
  }

  this._moveSelectorTo(this.saturationWidth * this.color.s, (1 - this.color.v) * this.height);
  this._moveHueTo((1 - (this._hueColor.h / 360)) * this.height);
  return this;
};

SimpleColorPicker.prototype.remove = function() {
  this.$saturation.removeEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.removeEventListener('mousedown', this._onHueMouseDown);
  this._onSaturationMouseUp();
  this._onHueMouseUp();
  if (this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
  return this;
};

SimpleColorPicker.prototype.appendTo = function(domElement) {
  domElement.appendChild(this.$el);
  return this;
};

SimpleColorPicker.prototype.onChange = function(callback) {
  this.on('update', callback);
  this.emit('update', this.getHexString());
  return this;
};

SimpleColorPicker.prototype.close = function() {
  this._onSaturationMouseUp();
  this._onHueMouseUp();
  return this;
};

/* ============================================================================= 
  Color getters
============================================================================= */
SimpleColorPicker.prototype.getHexString = function() {
  return this.color.hex;
};

SimpleColorPicker.prototype.getHexNumber = function() {
  return parseInt(this.color.hex.replace('#', ''), 16);
};

SimpleColorPicker.prototype.getRGB = function() {
  return this.color.rgb;
};

SimpleColorPicker.prototype.getHSV = function() {
  return this.color.hsv;
};

SimpleColorPicker.prototype.isDark = function() {
  return this.color.isDark();
};

SimpleColorPicker.prototype.isLight = function() {
  return this.color.isLight();
};

/* ============================================================================= 
  "Private" Methods LOL silly javascript
============================================================================= */
SimpleColorPicker.prototype._moveSelectorTo = function(x, y) {
  var maxX = this.saturationWidth;
  var maxY = this.height;

  x = clamp(x, 0, maxX);
  y = clamp(y, 0, maxY);
  
  // console.log();
  this.color.setHSV(this._hueColor.h, x / maxX, 1 - (y / maxY));
  // this.color.s = x / maxX;
  // this.color.v = 1 - (y / maxY);
  // this.color.h = this._hueColor.h;
  
  this._updateColor();

  transform(this.$sbSelector, {
    x: x,
    y: y
  });
};

SimpleColorPicker.prototype._moveHueTo = function(y) {
  var maxY = this.height - 2;
  
  y = clamp(y, 0, maxY);
  
  // var hue = Math.round(360 * (1 - (y / maxY)));
  var hue = 360 * (1 - (y / maxY));

  this.color.h = hue;
  this._hueColor.h = hue;
  this._updateHue();

  transform(this.$hSelector, {
    y: y
  });
};

SimpleColorPicker.prototype._updateHue = function() {
  this.$saturation.style.background = 'linear-gradient(to right, #fff 0%, ' + this._hueColor.hex + ' 100%)';
  this._updateColor();
};

SimpleColorPicker.prototype._updateColor = function() {
  this.$sbSelector.style.background = this.color.hex;
  this.$sbSelector.style.borderColor = this.color.isDark() ? '#FFF' : '#000';
  this.emit('update', this.getHexString());
};

/* ============================================================================= 
  Events
============================================================================= */
SimpleColorPicker.prototype._onSaturationMouseDown = function(e) {
  this.choosing = true;
  var sbOffset = offset(this.$saturation);
  this._moveSelectorTo(e.clientX - sbOffset.left, e.clientY - sbOffset.top);
  window.addEventListener('mouseup', this._onSaturationMouseUp);
  window.addEventListener('mousemove', this._onSaturationMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onSaturationMouseMove = function(e) {
  var sbOffset = offset(this.$saturation);
  this._moveSelectorTo(e.clientX - sbOffset.left, e.clientY - sbOffset.top);
};

SimpleColorPicker.prototype._onSaturationMouseUp = function(e) {
  this.choosing = false;
  window.removeEventListener('mouseup', this._onSaturationMouseUp);
  window.removeEventListener('mousemove', this._onSaturationMouseMove);
};

SimpleColorPicker.prototype._onHueMouseDown = function(e) {
  this.choosing = true;
  var hOffset = offset(this.$hue);
  this._moveHueTo(e.clientY - hOffset.top);
  window.addEventListener('mouseup', this._onHueMouseUp);
  window.addEventListener('mousemove', this._onHueMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onHueMouseMove = function(e) {
  var hOffset = offset(this.$hue);
  this._moveHueTo(e.clientY - hOffset.top);
};

SimpleColorPicker.prototype._onHueMouseUp = function(e) {
  this.choosing = false;
  window.removeEventListener('mouseup', this._onHueMouseUp);
  window.removeEventListener('mousemove', this._onHueMouseMove);
};

module.exports = SimpleColorPicker;