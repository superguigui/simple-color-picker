var domready = require('domready');

var ColorPicker = require('../index.js');

domready(function() {
  /* --------------------------
    ColorPicker
  */
  var colorPicker = new ColorPicker({
    el: document.body,
    color: '#123456',
    background: '#656565'
  });
  colorPicker.onChange(function(hexStringColor) {
    document.body.style.background = hexStringColor;
    document.querySelector('h1 a').style.color = colorPicker.color.isDark() ? '#FFFFFF' : '#000000';
  });
});
