// Tools
var domready = require('domready');

// guigui
var ColorPicker = require('../index.js');

domready(function() {
  /* --------------------------
    ColorPicker
  */
  var colorPicker = new ColorPicker({
    el: document.body,
    color: 'rgb(42, 69, 94)',
    background: 'dimgrey'
  });
  colorPicker.onChange(function(hexStringColor) {
    document.body.style.background = hexStringColor;
    document.querySelector('h1 a').style.color = colorPicker.color.dark() ? 'white' : 'black';
  });
});
