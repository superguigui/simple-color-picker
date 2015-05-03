var test = require('tape');
var SimpleColorPicker = require('..');

/* ======================================================================
  Sub Tests
=======================================================================*/

/* ======================================================================
  Create - No options
=======================================================================*/
test('SimpleColorPicker: No options', function(t) {
  t.plan(1);
  
  var colorPicker = new SimpleColorPicker();
  t.ok(colorPicker, 'instanciation ok');
});


/* ======================================================================
  Create - Options
=======================================================================*/
test('SimpleColorPicker: Options sizes', function(t) {
  t.plan(2);

  var colorPicker = new SimpleColorPicker({
    width: 200,
    height: 210
  });

  t.equal(colorPicker.width, 200, 'width option');
  t.equal(colorPicker.height, 210, 'height option');
});

test('SimpleColorPicker: Options color', function(t) {
  t.plan(2);

  var colorPickerHexNumber = new SimpleColorPicker({
    color: 0x123456
  });

  t.equal(colorPickerHexNumber.getHexString(), '#123456', 'color option hex number');

  var colorPickerHexString = new SimpleColorPicker({
    color: '#0000FF'
  });

  t.equal(colorPickerHexString.getHexString(), '#0000FF', 'color option hex string');
});

test('SimpleColorPicker: Options el', function(t) {
  t.plan(1);

  var div = document.createElement('div');
  var colorPicker = new SimpleColorPicker({
    el: div
  });

  t.equal(colorPicker.$el.parentNode, div, 'el option parent');
});

test('SimpleColorPicker: Options background', function(t) {
  t.plan(2);

  var colorPickerHexNumber = new SimpleColorPicker({
    background: 0xFF0000
  });

  t.equal(colorPickerHexNumber.$el.style.background, 'rgb(255, 0, 0)', 'background option hex number');

  var colorPickerHexString = new SimpleColorPicker({
    background: '#00FF00'
  });

  t.equal(colorPickerHexString.$el.style.background, 'rgb(0, 255, 0)', 'background option hex string');
});

/* ======================================================================
  Methods
=======================================================================*/
test('SimpleColorPicker: Methods setSize', function(t) {
  t.plan(4);

  var colorPicker = new SimpleColorPicker({
    width: 101,
    height: 102
  });
  colorPicker.setSize(203, 204);

  t.equal(colorPicker.width, 203, 'width property');
  t.equal(colorPicker.height, 204, 'height property');
  t.equal(colorPicker.$el.style.width, '203px', 'width style');
  t.equal(colorPicker.$el.style.height, '204px', 'height style');
});

test('SimpleColorPicker: Methods setColor', function(t) {
  t.plan(2);

  var colorPicker1 = new SimpleColorPicker();
  colorPicker1.setColor(0x123456);

  t.equal(colorPicker1.getHexString(), '#123456', 'setColor with hex number');

  var colorPicker2 = new SimpleColorPicker();
  colorPicker2.setColor('#123456');

  t.equal(colorPicker2.getHexString(), '#123456', 'setColor with hex string');
});