# simple-color-picker

Simple Color picker.

[demo](https://superguigui.github.io/simple-color-picker)

## Installation
You can simply install it via NPM
[![NPM](https://nodei.co/npm/simple-color-picker.png)](https://nodei.co/npm/simple-color-picker/)

Or use UNPKG CDN to load it as an UMD module, ready to be used in your browser.
```html
<script src="https://unpkg.com/simple-color-picker/dist/simple-color-picker.umd.js"/>
```

## Quickstart
```javascript
import ColorPicker from 'simple-color-picker';

const colorPicker = new ColorPicker();
```

You can retrieve the current color in different formats by using these convenient methods: 
* `colorPicker.getColor(); // output depends on previously inputed color format`
* `colorPicker.getHexString(); // #FFFFFF`
* `colorPicker.getHexNumber(); // 0xFFFFFF`
* `colorPicker.getRGB(); // {r: 255, g: 255, b: 255}`
* `colorPicker.getHSV(); // {h: 0, s: 0, v: 1}`

## Options
Options you can pass to constructor in an object like so :
```javascript
const colorPicker = new ColorPicker({
  color: '#FF0000',
  background: '#454545',
  el: document.body,
  width: 200,
  height: 200,
  window: document.getElementsByTagName('iframe')[0].contentWindow
});
```

None of these options are mandatory.

### `color`
The default color that the colorpicker will display. Default is #FFFFFF. It can be a hexadecimal number or an hex String.

### `background`
The background color of the colorpicker. Default is transparent. It can be a hexadecimal number or an hex String.

### `el`
A dom node or CSS selector(querySelector) to add the colorpicker to. You can also use `colorPicker.appendTo(domNode | '#id')` afterwards if you prefer.

### `width`
Desired width of the color picker. Default is 175.

### `height`
Desired height of the color picker. Default is 150.

### `window`
Reference to a window object. This will allow Simple Color Picker to apply event listeners in the correct context in the event that you are using it inside of an iFrame from a script that resides outside of it.

## Properties

### `.isChoosing`
Is true when mouse is down and user is currently choosing a color.

## Methods

### `.appendTo(domElement | CSS selector)`
Add the colorPicker instance to a domElement.

### `.remove()`
Removes colorpicker from is parent and kill all listeners. Call this method for proper destroy.

### `.setColor(color)`
Manually set the current color of the colorpicker. This is the method used on instantiation to convert `color` option to actual color for the colorpicker. Param can be a hexadecimal number or an hex String.

### `.setSize(width, height)`
Set size of the color picker for a given width and height. Note that a padding of 5px will be added if you chose to use the background option of the constructor.

### `.setBackgroundColor(color)`
Set the background color of the colorpicker. It also adds a 5px padding for design purpose. Param can be a hexadecimal number or an hex String.

### `.setNoBackground()`
Removes background of the colorpicker if previously set. It's no use calling this method if you didn't set the `background` option or if you didn't call `setBackgroundColor` previously.

### `.onChange(callback)`
Registers callback to the update event of the colorpicker. ColorPicker inherits from [component/emitter](https://github.com/component/emitter) so you could do the same thing by calling `colorPicker.on('update');`

### `.getColor()`
Main color getter, will return a formatted color string depending on input or a number depending on the last setColor call.

### `.getHexString()`
Returns color as css hex string (ex: '#FF0000').

### `.getHexNumber()`
Returns color as number (ex: 0xFF0000).

### `.getRGB()`
Returns color as {r: 255, g: 0, b: 0} object.

### `.getHSV()`
Returns color as {h: 1, s: 1, v: 1} object.

### `.isDark()`
Returns true if color is perceived as dark.

### `.isLight()`
Returns true if color is perceived as light.

## Styling
The javascript module automatically injects a `<style>` tag with the css it needs at the very top of the HEAD of your HTML.
If you want to override the default styles, just add your own styles in your page.