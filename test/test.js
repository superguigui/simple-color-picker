
var test = require('tape');
var SimpleColorPicker = require('..');

test('SimpleColorPicker', function(t) {
  t.plan(1);
  
  var colorPicker = new SimpleColorPicker();
  t.ok(colorPicker, 'it exists wouhou');
});