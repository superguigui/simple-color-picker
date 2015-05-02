module.exports = function hsv2rgb(h, s, v) {

  var hi = Math.floor(h / 60) % 6;
  // var hi = (h / 60) % 6;

  var f = h / 60 - Math.floor(h / 60);
  // var f = h / 60 - (h / 60);
  var p = v * (1.0 - s);
  var q = v * (1.0 - (f * s));
  var t = v * (1.0 - ((1.0 - f) * s));
  var c = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q]
  ][hi];

  return {
    r: c[0] * 255,
    g: c[1] * 255,
    b: c[2] * 255
  };

};
