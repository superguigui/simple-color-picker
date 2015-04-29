'use strict';

var bindAll = require('lodash.bindall');
var transform = require('dom-transform');
var Color = require('color');
var Emitter = require('component-emitter');
var isNumber = require('is-number');
var offset = require('./utils/dom/offset');
var clamp = require('./utils/maths/clamp');
var createColor = require('./utils/createColor');
var css = require('./css/style.css');


function SimpleColorPicker(options) {

  // options
  options = options || {};
  this.color = null;
  this._hueColor = null;
  this.callbacks = [];

  // bind methods to scope (only if needed)
  bindAll(this, '_onSaturationMouseMove', '_onSaturationMouseDown', '_onSaturationMouseUp', '_onHueMouseDown', '_onHueMouseUp', '_onHueMouseMove');

  // dom template
  this._template = [
    '<div class="saturation">',
      '<div class="brightness"></div>',
      '<div class="sb-selector"></div>',
    '</div>',
    '<div class="hue">',
      '<div class="h-selector">',
        '<div class="right"></div>',
      '</div>',
    '</div>'
  ].join('\n');

  // dom elements
  this.$el = document.createElement('div');
  this.$el.className = 'scp';
  this.$el.innerHTML = this._template;

  this.$saturation = this.$el.querySelector('.saturation');
  this.$hue = this.$el.querySelector('.hue');
  this.$sbSelector = this.$el.querySelector('.sb-selector');
  this.$hSelector = this.$el.querySelector('.h-selector');

  // create event listeners
  this.$saturation.addEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.addEventListener('mousedown', this._onHueMouseDown);

  // some styling and doming from options
  if(options.el) {
    this.appendTo(options.el);
  }
  if(options.background) {
    this.$el.style.background = createColor(options.background).hexString();
  }
  if(options.width && isNumber(options.width)) {
    this.$el.style.width = options.width + 'px';
  }
  if(options.height && isNumber(options.width)) {
    this.$el.style.height = options.height + 'px';
  }
  
  setTimeout(function() {
    this.setColor(options.color);
  }.bind(this), 0);

  return this;
}

Emitter(SimpleColorPicker.prototype);

SimpleColorPicker.prototype.setColor = function(color) {
  this.color = createColor(color);
  this._hueColor = this.color.clone().saturation(100).lightness(50);
  if(this.color.saturation() === 0) {
    this._hueColor.red(255);
  }
  this._moveSelectorTo((this.color.saturationv() / 100) * (this.$saturation.offsetWidth - 5) + 5, (1 - (this.color.value() / 100)) * (this.$saturation.offsetHeight - 2) + 5);
  this._moveHueTo((1 - (this._hueColor.hue() / 360)) * (this.$hue.offsetHeight - 2) + 4);
};

SimpleColorPicker.prototype.remove = function() {
  this.$saturation.removeEventListener('mousedown', this._onSaturationMouseDown);
  this.$hue.removeEventListener('mousedown', this._onHueMouseDown);
  this._onSaturationMouseUp();
  this._onHueMouseUp();
  if(this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
};

SimpleColorPicker.prototype.appendTo = function(domElement) {
  domElement.appendChild(this.$el);
};

SimpleColorPicker.prototype.getHexString = function() {
  return this.color.hexString();
};

SimpleColorPicker.prototype.onChange = function(callback) {
  this.on('update', callback);
};

/* ============================================================================= 
  "Private" Methods LOL silly javascript
============================================================================= */
SimpleColorPicker.prototype._moveSelectorTo = function(x, y) {
  var maxX = this.$saturation.offsetWidth - 5;
  var maxY = this.$saturation.offsetHeight - 5;

  x = clamp(x - 5, 0, maxX);
  y = clamp(y - 5, 0, maxY);
  
  this.color.saturationv(100 * x / maxX);
  this.color.value(100 * (1 - (y / maxY)));

  this._updateColor();

  transform(this.$sbSelector, {
    x: x,
    y: y
  });
};

SimpleColorPicker.prototype._moveHueTo = function(y) {
  var maxY = this.$hue.offsetHeight - 2;
  
  y = clamp(y - 4, 0, maxY);
  
  var hue = 360 * (1 - (y / maxY));

  this.color.hue(hue);
  this._hueColor.hue(hue);
  this._updateHue();

  transform(this.$hSelector, {
    y: y
  });
};

SimpleColorPicker.prototype._updateHue = function() {
  this.$saturation.style.background = 'linear-gradient(to right, #fff 0%, ' + this._hueColor.hexString() + ' 100%)';
  this._updateColor();
};

SimpleColorPicker.prototype._updateColor = function() {
  this.$sbSelector.style.background = this.color.hexString();
  this.$sbSelector.style.borderColor = this.color.dark() ? '#FFF' : '#000';
  this.emit('update', this.getHexString());
};


/* ============================================================================= 
  Events
============================================================================= */
SimpleColorPicker.prototype._onSaturationMouseDown = function(e) {
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
  window.removeEventListener('mouseup', this._onSaturationMouseUp);
  window.removeEventListener('mousemove', this._onSaturationMouseMove);
};

SimpleColorPicker.prototype._onHueMouseDown = function(e) {
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
  window.removeEventListener('mouseup', this._onHueMouseUp);
  window.removeEventListener('mousemove', this._onHueMouseMove);
};

module.exports = SimpleColorPicker;