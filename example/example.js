var domready = require('domready');

var ColorPicker = require('../index.js');
var Color = require('../src/Color');

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

  var c1 = new Color(0x123456);

  console.log('c1', c1);
});
