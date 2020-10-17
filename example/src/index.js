import ColorPicker from '../../dist/simple-color-picker'
import '../../dist/simple-color-picker.css'

/* --------------------------
  ColorPicker
*/
var colorPicker = new ColorPicker({
	el: document.body,
	color: '#123456',
	background: '#656565'
  });
  
  colorPicker.onChange(hexStringColor => {
	document.body.style.background = hexStringColor;
	document.querySelector('h1 a').style.color = colorPicker.isDark() ? '#FFFFFF' : '#000000';
  });
  