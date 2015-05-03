'use strict';

var bindAll = require('lodash.bindall');
var transform = require('dom-transform');
var tinycolor = require('tinycolor2');
var Emitter = require('component-emitter');
var isNumber = require('is-number');
var offset = require('./src/utils/dom/offset');
var clamp = require('./src/utils/maths/clamp');

function SimpleColorPicker(options) {
  // options
  options = options || {};

  // properties
  this.color = null;
  this.width = 0;
  this.height = 0;
  this.hue = 0;
  this.choosing = false;
  this.position = {x: 0, y: 0};
  this.huePosition = 0;
  this.saturationWidth = 0;
  this.maxHue = 0;

  // bind methods to scope (only if needed)
  bindAll(this, '_onSaturationMouseMove', '_onSaturationMouseDown', '_onSaturationMouseUp', '_onHueMouseDown', '_onHueMouseUp', '_onHueMouseMove');

  // create dom
  this.$el = document.createElement('div');
  this.$el.className = 'Scp';
  this.$el.innerHTML = [
    '<div class="Scp-saturation">',
      '<div class="Scp-brightness"></div>',
      '<div class="Scp-sbSelector"></div>',
    '</div>',
    '<div class="Scp-hue">',
      '<div class="Scp-hSelector"></div>',
    '</div>'
  ].join('\n');;

  // dom accessors
  this.$saturation = this.$el.querySelector('.Scp-saturation');
  this.$hue = this.$el.querySelector('.Scp-hue');
  this.$sbSelector = this.$el.querySelector('.Scp-sbSelector');
  this.$hSelector = this.$el.querySelector('.Scp-hSelector');

  // event listeners
  this.$saturation.addEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.addEventListener('mousedown', this._onHueMouseDown);

  // some styling and DOMing from options
  if (options.el) {
    this.appendTo(options.el);
  }
  if (options.background) {
    this.setBackgroundColor(options.background);
  }
  this.setSize(options.width || 175,  options.height || 150);
  this.setColor(options.color);

  return this;
}

Emitter(SimpleColorPicker.prototype);

/* ============================================================================= 
  Public API
============================================================================= */
/**
 * Set size of the color picker for a given width and height. Note that
 * a padding of 5px will be added if you chose to use the background option
 * of the constructor.
 * @param {Number} width
 * @param {Number} height
 */
SimpleColorPicker.prototype.setSize = function(width, height) {
  this.width = width;
  this.height = height;
  this.$el.style.width = this.width + 'px';
  this.$el.style.height = this.height + 'px';
  this.saturationWidth = this.width - 25;
  this.maxHue = this.height - 2;
  return this;
};

/**
 * Set the background color of the colorpicker. It also adds a 5px padding
 * for design purpose.
 * @param {String|Number} color hex color desired for background
 */
SimpleColorPicker.prototype.setBackgroundColor = function(color) {
  if(isNumber(color)) {
    color = color.toString(16);
  }
  this.$el.style.padding = '5px';
  this.$el.style.background = tinycolor(color).toHexString();
};

/**
 * Remove background of the colorpicker if previously set. It's no use
 * calling this method if you didn't set the background option on start
 * or if you didn't call setBackgroundColor previously.
 */
SimpleColorPicker.prototype.setNoBackground = function() {
  this.$el.style.padding = '0px';
  this.$el.style.background = 'none';
};

/**
 * Manually set the current color of the colorpicker. This is the method
 * used on instantiation to convert 'color' option to actual color for 
 * the colorpicker.
 * @param {String|Number} color hex color desired
 */
SimpleColorPicker.prototype.setColor = function(color) {
  if(isNumber(color)) {
    color = color.toString(16);
  }
  this.color = tinycolor(color);

  var hsvColor = this.color.toHsv();

  if(!isNaN(hsvColor.h)) {
    this.hue = hsvColor.h;
  }

  this._moveSelectorTo(this.saturationWidth * hsvColor.s, (1 - hsvColor.v) * this.height);
  this._moveHueTo((1 - (this.hue / 360)) * this.height);

  this._updateHue();
  return this;
};

/**
 * Removes colorpicker from is parent and kill all listeners.
 * Call this method for proper destroy.
 */
SimpleColorPicker.prototype.remove = function() {
  this.$saturation.removeEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.removeEventListener('mousedown', this._onHueMouseDown);
  this._onSaturationMouseUp();
  this._onHueMouseUp();
  this.off();
  if (this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
};

/**
 * Add colorpicker to a domElement.
 * @param  {domElement} domElement 
 * @return {colorPicker} returns itself for chaining purpose
 */
SimpleColorPicker.prototype.appendTo = function(domElement) {
  domElement.appendChild(this.$el);
  return this;
};

/**
 * Convenient method to add a listener on the update event.
 * Equivalent on doing `colorPicker.on('update', callback)`;
 * @param  {Function} callback 
 * @return {colorPicker} returns itself for chaining purpose
 */
SimpleColorPicker.prototype.onChange = function(callback) {
  this.on('update', callback);
  this.emit('update', this.getHexString());
  return this;
};

/**
 * Call this when you want to hide the colorpicker to be sure that
 * no dragging is going on.
 * @return {colorPicker} returns itself for chaining purpose
 */
SimpleColorPicker.prototype.close = function() {
  this._onSaturationMouseUp();
  this._onHueMouseUp();
  return this;
};

/* ============================================================================= 
  Color getters
============================================================================= */
SimpleColorPicker.prototype.getHexString = function() {
  return this.color.toHexString().toUpperCase();
};

SimpleColorPicker.prototype.getHexNumber = function() {
  return parseInt(this.color.toHex(), 16);
};

SimpleColorPicker.prototype.getRGB = function() {
  return this.color.toRgb();
};

SimpleColorPicker.prototype.getHSV = function() {
  return this.color.toHsv();
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
  this.position.x = clamp(x, 0, this.saturationWidth);
  this.position.y = clamp(y, 0, this.height);
  
  transform(this.$sbSelector, {
    x: this.position.x,
    y: this.position.y
  });

};

SimpleColorPicker.prototype._updateColorFromPosition = function() {
  this.color = tinycolor({h: this.hue, s: this.position.x / this.saturationWidth, v: 1 - (this.position.y / this.height)});
  this._updateColor();
};

SimpleColorPicker.prototype._moveHueTo = function(y) {
  this.huePosition = clamp(y, 0, this.maxHue);
  
  transform(this.$hSelector, {
    y: this.huePosition
  });

};

SimpleColorPicker.prototype._updateHueFromPosition = function() {
  var hsvColor = this.color.toHsv();
  this.hue = 360 * (1 - (this.huePosition / this.maxHue));
  this.color = tinycolor({h: this.hue, s: hsvColor.s, v: hsvColor.v});
  this._updateHue();
};

SimpleColorPicker.prototype._updateHue = function() {
  var hueColor = tinycolor({h: this.hue, s: 1, v: 1});
  this.$saturation.style.background = 'linear-gradient(to right, #fff 0%, ' + hueColor.toHexString() + ' 100%)';
  this._updateColor();
};

SimpleColorPicker.prototype._updateColor = function() {
  this.$sbSelector.style.background = this.color.toHexString();
  this.$sbSelector.style.borderColor = this.color.isDark() ? '#FFF' : '#000';
  this.emit('update', this.color.toHexString());
};

/* ============================================================================= 
  Events
============================================================================= */
SimpleColorPicker.prototype._onSaturationMouseDown = function(e) {
  this.choosing = true;
  var sbOffset = offset(this.$saturation);
  this._moveSelectorTo(e.clientX - sbOffset.left, e.clientY - sbOffset.top);
  this._updateColorFromPosition();
  window.addEventListener('mouseup', this._onSaturationMouseUp);
  window.addEventListener('mousemove', this._onSaturationMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onSaturationMouseMove = function(e) {
  var sbOffset = offset(this.$saturation);
  this._moveSelectorTo(e.clientX - sbOffset.left, e.clientY - sbOffset.top);
  this._updateColorFromPosition();
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
  this._updateHueFromPosition();
  window.addEventListener('mouseup', this._onHueMouseUp);
  window.addEventListener('mousemove', this._onHueMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onHueMouseMove = function(e) {
  var hOffset = offset(this.$hue);
  this._moveHueTo(e.clientY - hOffset.top);
  this._updateHueFromPosition();
};

SimpleColorPicker.prototype._onHueMouseUp = function(e) {
  this.choosing = false;
  window.removeEventListener('mouseup', this._onHueMouseUp);
  window.removeEventListener('mousemove', this._onHueMouseMove);
};

module.exports = SimpleColorPicker;