<a name="SimpleColorPicker"></a>
## SimpleColorPicker(options)
Creates a new Colorpicker

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.color | <code>String</code> &#124; <code>Number</code> &#124; <code>Object</code> | Initial color that will be displayed on the colorpicker. |
| options.background | <code>String</code> &#124; <code>Number</code> &#124; <code>Object</code> | Background color of the color picker. |
| options.el | <code>DomElement</code> | DomElement to add the colorpicker to |
| options.width | <code>Number</code> | initial width of the colorpicker |
| options.height | <code>Number</code> | initial height of the colorpicker |


* [SimpleColorPicker(options)](#SimpleColorPicker)
  * [.setSize(width, height)](#SimpleColorPicker#setSize)
  * [.setBackgroundColor(color)](#SimpleColorPicker#setBackgroundColor)
  * [.setNoBackground()](#SimpleColorPicker#setNoBackground)
  * [.setColor(color)](#SimpleColorPicker#setColor)
  * [.remove()](#SimpleColorPicker#remove)
  * [.appendTo(domElement)](#SimpleColorPicker#appendTo) ⇒ <code>colorPicker</code>
  * [.onChange(callback)](#SimpleColorPicker#onChange) ⇒ <code>colorPicker</code>
  * [.close()](#SimpleColorPicker#close) ⇒ <code>colorPicker</code>
  * [.getColor()](#SimpleColorPicker#getColor) ⇒ <code>Number</code> &#124; <code>String</code>
  * [.getHexString()](#SimpleColorPicker#getHexString) ⇒ <code>String</code>
  * [.getHexNumber()](#SimpleColorPicker#getHexNumber) ⇒ <code>Number</code>
  * [.getRGB()](#SimpleColorPicker#getRGB) ⇒ <code>Object</code>
  * [.getHSV()](#SimpleColorPicker#getHSV) ⇒ <code>Object</code>
  * [.isDark()](#SimpleColorPicker#isDark) ⇒ <code>Boolean</code>
  * [.isLight()](#SimpleColorPicker#isLight) ⇒ <code>Boolean</code>

<a name="SimpleColorPicker#setSize"></a>
### simpleColorPicker.setSize(width, height)
Set size of the color picker for a given width and height. Note that
a padding of 5px will be added if you chose to use the background option
of the constructor.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  

| Param | Type |
| --- | --- |
| width | <code>Number</code> | 
| height | <code>Number</code> | 

<a name="SimpleColorPicker#setBackgroundColor"></a>
### simpleColorPicker.setBackgroundColor(color)
Set the background color of the colorpicker. It also adds a 5px padding
for design purpose.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>String</code> &#124; <code>Number</code> | hex color desired for background |

<a name="SimpleColorPicker#setNoBackground"></a>
### simpleColorPicker.setNoBackground()
Remove background of the colorpicker if previously set. It's no use
calling this method if you didn't set the background option on start
or if you didn't call setBackgroundColor previously.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#setColor"></a>
### simpleColorPicker.setColor(color)
Manually set the current color of the colorpicker. This is the method
used on instantiation to convert 'color' option to actual color for
the colorpicker.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>String</code> &#124; <code>Number</code> | hex color desired |

<a name="SimpleColorPicker#remove"></a>
### simpleColorPicker.remove()
Removes colorpicker from is parent and kill all listeners.
Call this method for proper destroy.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#appendTo"></a>
### simpleColorPicker.appendTo(domElement) ⇒ <code>colorPicker</code>
Add colorpicker to a domElement.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
**Returns**: <code>colorPicker</code> - returns itself for chaining purpose  

| Param | Type |
| --- | --- |
| domElement | <code>domElement</code> | 

<a name="SimpleColorPicker#onChange"></a>
### simpleColorPicker.onChange(callback) ⇒ <code>colorPicker</code>
Convenient method to add a listener on the update event.
Equivalent on doing `colorPicker.on('update', callback)`;

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
**Returns**: <code>colorPicker</code> - returns itself for chaining purpose  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="SimpleColorPicker#close"></a>
### simpleColorPicker.close() ⇒ <code>colorPicker</code>
Call this when you want to hide the colorpicker to be sure that
no dragging is going on.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
**Returns**: <code>colorPicker</code> - returns itself for chaining purpose  
<a name="SimpleColorPicker#getColor"></a>
### simpleColorPicker.getColor() ⇒ <code>Number</code> &#124; <code>String</code>
Main color getter, will return a formatted color string depending on input
or a number depending on the last setColor call.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#getHexString"></a>
### simpleColorPicker.getHexString() ⇒ <code>String</code>
Returns color as css hex string (ex: '#FF0000').

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#getHexNumber"></a>
### simpleColorPicker.getHexNumber() ⇒ <code>Number</code>
Returns color as number (ex: 0xFF0000).

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#getRGB"></a>
### simpleColorPicker.getRGB() ⇒ <code>Object</code>
Returns color as {r: 255, g: 0, b: 0} object.

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#getHSV"></a>
### simpleColorPicker.getHSV() ⇒ <code>Object</code>
Returns color as {h: 100, s: 1, v: 1} object

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#isDark"></a>
### simpleColorPicker.isDark() ⇒ <code>Boolean</code>
Returns true if color is perceived as dark

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
<a name="SimpleColorPicker#isLight"></a>
### simpleColorPicker.isLight() ⇒ <code>Boolean</code>
Returns true if color is perceived as light

**Kind**: instance method of <code>[SimpleColorPicker](#SimpleColorPicker)</code>  
