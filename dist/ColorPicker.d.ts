import { Color, RGBAColor, HSVAColor } from './color';
import { Position } from './utils';
declare type ColorPickerOptions = {
    window?: Window;
    el?: HTMLElement | string;
    background?: string | number;
    widthUnits?: string;
    heightUnits?: string;
    width?: number;
    height?: number;
    color?: string | number;
};
export declare class ColorPicker {
    private _window;
    private _document;
    private _widthUnits;
    private _heightUnits;
    private _huePosition;
    private _hueHeight;
    private _maxHue;
    _inputIsNumber: boolean;
    private _saturationWidth;
    private _callbacks;
    width: number;
    height: number;
    hue: number;
    position: Position;
    color: Color;
    backgroundColor: Color;
    hueColor: Color;
    $el: HTMLElement;
    $saturation: HTMLElement;
    $hue: HTMLElement;
    $sbSelector: HTMLElement;
    $hSelector: HTMLElement;
    constructor(options?: ColorPickerOptions);
    /**
     * Add the ColorPicker instance to a DOM element.
     * @param  {HTMLElement} el
     * @return {ColorPicker} Returns itself for chaining purpose
     */
    appendTo(el: HTMLElement | string): ColorPicker;
    /**
     * Removes picker from its parent and kill all listeners.
     * Call this method for proper destroy.
     */
    remove(): void;
    /**
     * Manually set the current color of the picker. This is the method
     * used on instantiation to convert `color` option to actual color for
     * the picker. Param can be a hexadecimal number or an hex String.
     * @param {String|Number} color hex color desired
     * @return {ColorPicker} Returns itself for chaining purpose
     */
    setColor(color: string | number): ColorPicker;
    /**
     * Set size of the color picker for a given width and height. Note that
     * a padding of 5px will be added if you chose to use the background option
     * of the constructor.
     * @param {Number} width
     * @param {Number} height
     * @return {ColorPicker} Returns itself for chaining purpose
     */
    setSize(width: number, height: number): ColorPicker;
    /**
     * Set the background color of the picker. It also adds a 5px padding
     * for design purpose.
     * @param {String|Number} color hex color desired for background
     * @return {ColorPicker} Returns itself for chaining purpose
     */
    setBackgroundColor(color: string | number): ColorPicker;
    /**
     * Removes background of the picker if previously set. It's no use
     * calling this method if you didn't set the background option on start
     * or if you didn't call setBackgroundColor previously.
     */
    setNoBackground(): ColorPicker;
    /**
     * Registers callback to the update event of the picker.
     * picker inherits from [component/emitter](https://github.com/component/emitter)
     * so you could do the same thing by calling `colorPicker.on('update');`
     * @param  {Function} callback
     * @return {ColorPicker} Returns itself for chaining purpose
     */
    onChange(callback: Function): ColorPicker;
    /**
     * Main color getter, will return a formatted color string depending on input
     * or a number depending on the last setColor call.
     * @return {Number|String}
     */
    getColor(): number | string;
    /**
     * Returns color as css hex string (ex: '#FF0000').
     * @return {String}
     */
    getHexString(): string;
    /**
     * Returns color as number (ex: 0xFF0000).
     * @return {Number}
     */
    getHexNumber(): number;
    /**
     * Returns color as {r: 1, g: 0, b: 0} object.
     * @return {Object}
     */
    getRGB(): RGBAColor;
    /**
     * Returns color as {h: 100, s: 1, v: 1} object.
     * @return {Object}
     */
    getHSV(): HSVAColor;
    /**
     * Returns true if color is perceived as dark
     * @return {Boolean}
     */
    isDark(): boolean;
    /**
     * Returns true if color is perceived as light
     * @return {Boolean}
     */
    isLight(): boolean;
    private _moveSelectorTo;
    private _updateColorFromPosition;
    private _moveHueTo;
    private _updateHueFromPosition;
    private _updateHue;
    private _updateColor;
    private _triggerChange;
    private _onSaturationMouseDown;
    private _onSaturationMouseMove;
    private _onSaturationMouseUp;
    private _onHueMouseDown;
    private _onHueMouseMove;
    private _onHueMouseUp;
}
export {};
