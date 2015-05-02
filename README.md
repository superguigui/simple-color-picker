[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# simple-color-picker

Simple Color picker in common.js.

[demo](http://superguigui.github.io/simple-color-picker)

## Installation
[![NPM](https://nodei.co/npm/simple-color-picker.png)](https://nodei.co/npm/simple-color-picker/)

## Quickstart
```javascript
var ColorPicker = require('simple-color-picker');

var colorPicker = new ColorPicker();
```

And include 'simple-color-picker.css' in your html or import it in your css.

You can retrieve the current color in different formats by using these convenient methods: 
* `colorPicker.getHexString(); // #FFFFFF`
* `colorPicker.getHexNumber(); // 0xFFFFFF`
* `colorPicker.getRGB(); // {r: 255, g: 255, b: 255}`
* `colorPicker.getHSV(); // {h: 0, s: 0, v: 1}`

## Options
Options you can pass to constructor in an object like so :
```javascript
var colorPicker = new ColorPicker({
  color: '#FF0000',
  background: '#454545',
  el: document.body,
  width: 200,
  height: 200
});
```

None of these options are mendatory.

### `color`
The default color that the colorpicker will display. Default is #FFFFFF. It can be a hexadecimal number or an hex String.

### `background`
The background color of the colorpicker. Default is transparent. It can be a hexadecimal number or an hex String.

### `el`
A dom node to add the colorpicker to. You can also use colorPicker.appendTo(domNode) afterwards if you prefer.

### `width`
Desired width of the color picker. Default is 150.

### `height`
Desired height of the color picker. Default is 150.

## Methods

### `.appendTo(domElement)`
Add the colorPicker instance to a domElement.

### `.remove()`
Remove the colorpicker from parent and destroy it.

### `.setColor(color)`
Manually change the current color of the colorpicker. It will update its display. Param can be a hexadecimal number or an hex String.

### `.onChange(callback)`
Register the callback to the update event of the colorpicker. ColorPicker inherits from [component/emitter](https://github.com/component/emitter) so you could do the same thing by calling `colorPicker.on('update');`

### `.getHexString()`
Returns current color as a CSS compatible Hex String (ex: `"#FF0000"`)

### `.getHexString()`
Returns current color as a hexadecimal number (ex: `0xFF0000`).

### `.getRGB()`
Returns current color as an RGB object (ex: `{r: 255, g: 0, b: 0}`).

### `.getHSV()`
Returns current color as an HSV object (ex: `{h: 360, s: 0, v: 1.0}`).

### `.isDark()`
Indicate wether color is perceived dark or not.

### `.isLight()`
Indicate wether color is perceived light or not (`!colorPicker.isDark()`).
