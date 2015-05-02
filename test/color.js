var test = require('tape');
var Color = require('../src/Color');

test('Color: create', function(t) {
  t.plan(7);

  var c1 = new Color(0x123456);
  var c2 = new Color('#A1B2C3');
  var c3 = new Color([0, 0, 255]);
  var c4 = new Color({r: 255, g: 255, b: 0});
  var c5 = new Color({h: 360, s: 1, v: 1});

  t.equal(c1.hex, '#123456', 'hex number as input');
  t.equal(c2.hex, '#A1B2C3', 'hex string as input');
  t.equal(c3.hex, '#0000FF', 'array as input');
  t.equal(c4.hex, '#FFFF00', 'object RGB as input');
  t.equal(c5.hex, '#FF0000', 'object HSV as input');

  try {
    var c6 = new Color({red: 255, green: 255, blue: 0});
  }
  catch(err) {
    t.pass('object with unknown property as input should throw an error');
  }

  try {
    var c7 = new Color([1, 2, 3, 4]);
  }
  catch(err) {
    t.pass('array with weird length as input should throw an error');
  }

});

test('Color: getters', function(t) {
  t.plan(8);

  var c = new Color(0xFF00AA);

  t.equal(c.r, 255, 'get r');
  t.equal(c.g, 0, 'get g');
  t.equal(c.b, 170, 'get b');
  t.deepEqual(c.rgb, {r: 255, g: 0, b: 170}, 'get RGB');

  t.equal(c.h, 320, 'get h');
  t.equal(c.s, 1, 'get s');
  t.equal(c.v, 1, 'get v');
  t.deepEqual(c.hsv, {h: 320, s: 1, v: 1}, 'get RGB');

});

test('Color: setters RGB', function(t) {
  t.plan(4);

  var c = new Color(0xFF0000);
  
  c.b = 255;
  t.equal(c.hex, '#FF00FF', 'set b');

  c.r = 0;
  t.equal(c.hex, '#0000FF', 'set r');

  c.g = 255;
  t.equal(c.hex, '#00FFFF', 'set g');

  c.setRGB(255, 255, 0);
  t.equal(c.hex, '#FFFF00', 'set RGB');

});

test('Color: setters HSV', function(t) {
  t.plan(4);

  var c = new Color(0x123456);
  
  c.h = 60;
  t.equal(c.hex, '#565612', 'set h');

  c.s = 0.9;
  t.equal(c.hex, '#565608', 'set s');

  c.v = 0.12;
  t.equal(c.hex, '#1E1E02', 'set v');

  c.setHSV(10, 0.2, 0.3);
  t.deepEqual(c.rgb, {r: 76, g: 63, b: 61}, 'set HSV');

});

test('Color: setters Hex', function(t) {
  t.plan(1);

  var c = new Color(0xFF0000);

  c.setHex(0x00FF00, 'set Hex');
  t.equal(c.hex, '#00FF00');
});

test('Color: perceived brightness', function(t) {
  t.plan(8);

  var cLightest = new Color(0xFFFFFF);
  t.ok(cLightest.isLight());
  t.notOk(cLightest.isDark());

  var cDarkest = new Color(0x000000);
  t.ok(cDarkest.isDark());
  t.notOk(cDarkest.isLight());

  var cDark = new Color(0x874E87);
  t.ok(cDark.isDark());
  t.notOk(cDark.isLight());

  var cLight = new Color(0xBA88BA);
  t.ok(cLight.isLight());
  t.notOk(cLight.isDark());
});

test('Color: clone', function(t) {
  t.plan(3);

  var c1 = new Color(0x123456);
  var c2 = c1.clone();

  t.ok(c2);
  t.equal(c1.hex, c2.hex);

  c1.setHex(0x654321);
  t.notEqual(c1.hex, c2.hex);
});
