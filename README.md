[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# simple-color-picker

Simple Color picker in common.js that doesn't rely on jQuery. The color manipulations are done using [harthur/color](https://github.com/harthur/color).

[demo](http://superguigui.github.io/simple-color-picker)

## Installation
[![NPM](https://nodei.co/npm/simple-color-picker.png)](https://nodei.co/npm/simple-color-picker/)

## Quickstart
```javascript
var ColorPicker = require('simple-color-picker');

var colorPicker = new ColorPicker();
```

And include 'simple-color-picker.css' in your html or import it in your css.


You can retrieve the current color with `colorPicker.color`. It will return a [harthur/color](https://github.com/harthur/color) instance. If you prefer a simple hex string use `colorPicker/getHexString();`

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
The default color that the colorpicker will display. Default is #FFFFFF. It can be a hexadecimal number, an hex String and all other formats supported by [harthur/color](https://github.com/harthur/color).

### `background`
The background color of the colorpicker. Default is transparent. It can be a hexadecimal number, an hex String and all other formats supported by [harthur/color](https://github.com/harthur/color).

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
Manually change the current color of the colorpicker. It will update its display. Param can be a hexadecimal number, an hex String and all other formats supported by [harthur/color](https://github.com/harthur/color).

### `.onChange(callback)`
Register the callback to the update event of the colorpicker. ColorPicker inherits from [component/emitter](https://github.com/component/emitter) so you could do the same thing by calling `colorPicker.on('update');`

### `.getHexString()`
Returns current color as a CSS compatible Hex String.
