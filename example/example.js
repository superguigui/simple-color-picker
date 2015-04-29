// Tools
var domready = require('domready');

// guigui
var ColorPicker = require('../src/index.js');

domready(function() {
  /* --------------------------
    ColorPicker
  */
  var colorPicker = new ColorPicker({
    el: document.body
  }).onChange(function(hexStringColor) {
    document.body.style.background = hexStringColor;
  });
});
