import { Color, RGBAColor, HSVAColor } from './color'
import { isNumber, isString } from './types'
import { clamp, Position, getMousePosition } from './utils'

type ColorPickerOptions = {
  window?: Window
  el?: HTMLElement | string
  background?: string | number
  widthUnits?: string
  heightUnits?: string
  width?: number
  height?: number
  color?: string | number
}

export class ColorPicker {
  private _window: Window
  private _document: Document
  private _widthUnits: string = 'px'
  private _heightUnits: string = 'px'
  private _huePosition: number = 0
  private _hueHeight: number = 0
  private _maxHue: number = 0
  public _inputIsNumber: boolean = false
  private _saturationWidth: number = 0
  private _isChoosing: boolean = false
  private _callbacks: Function[] = []

  public width: number = 0
  public height: number = 0
  public hue: number = 0
  public position: Position = { x: 0, y: 0 }
  public color: Color = new Color(0)
  public backgroundColor: Color = new Color(0)
  public hueColor: Color = new Color(0)

  public $el: HTMLElement
  public $saturation: HTMLElement
  public $hue: HTMLElement
  public $sbSelector: HTMLElement
  public $hSelector: HTMLElement

  constructor(options: ColorPickerOptions = {}) {
    // Register window and document references in case this is instantiated inside of an iframe
    this._window = options.window || window
    this._document = this._window.document

    // Create DOM
    this.$el = this._document.createElement('div')
    this.$el.className = 'Scp'
    this.$el.innerHTML = `
      <div class="Scp-saturation">
        <div class="Scp-brightness"></div>
        <div class="Scp-sbSelector"></div>
      </div>
      <div class="Scp-hue">
        <div class="Scp-hSelector"></div>
      </div>
    `

    // DOM accessors
    this.$saturation = this.$el.querySelector('.Scp-saturation')
    this.$hue = this.$el.querySelector('.Scp-hue')
    this.$sbSelector = this.$el.querySelector('.Scp-sbSelector')
    this.$hSelector = this.$el.querySelector('.Scp-hSelector')

    // Event listeners
    this.$saturation.addEventListener('mousedown', this._onSaturationMouseDown)
    this.$saturation.addEventListener('touchstart', this._onSaturationMouseDown)
    this.$hue.addEventListener('mousedown', this._onHueMouseDown)
    this.$hue.addEventListener('touchstart', this._onHueMouseDown)

    // Some styling and DOMing from options
    if (options.el) {
      this.appendTo(options.el)
    }

    if (options.background) {
      this.setBackgroundColor(options.background)
    }

    if (options.widthUnits) {
      this._widthUnits = options.widthUnits
    }

    if (options.heightUnits) {
      this._heightUnits = options.heightUnits
    }

    this.setSize(options.width || 175, options.height || 150)
    this.setColor(options.color)
  }

  /**
   * Add the ColorPicker instance to a DOM element.
   * @param  {HTMLElement} el
   * @return {ColorPicker} Returns itself for chaining purpose
   */
  public appendTo(el: HTMLElement | string): ColorPicker {
    if (isString(el)) {
      document.querySelector(el as string).appendChild(this.$el)
    } else {
      ;(el as HTMLElement).appendChild(this.$el)
    }
    return this
  }

  /**
   * Removes picker from its parent and kill all listeners.
   * Call this method for proper destroy.
   */
  public remove() {
    this._callbacks = []

    this._onSaturationMouseUp()
    this._onHueMouseUp()

    this.$saturation.removeEventListener(
      'mousedown',
      this._onSaturationMouseDown
    )
    this.$saturation.removeEventListener(
      'touchstart',
      this._onSaturationMouseDown
    )
    this.$hue.removeEventListener('mousedown', this._onHueMouseDown)
    this.$hue.removeEventListener('touchstart', this._onHueMouseDown)

    // this.off()

    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }

  /**
   * Manually set the current color of the picker. This is the method
   * used on instantiation to convert `color` option to actual color for
   * the picker. Param can be a hexadecimal number or an hex String.
   * @param {String|Number} color hex color desired
   * @return {ColorPicker} Returns itself for chaining purpose
   */
  public setColor(color: string | number): ColorPicker {
    this._inputIsNumber = isNumber(color)
    this.color.fromHex(color)

    const { h, s, v } = this.color.hsv

    if (!isNaN(h)) {
      this.hue = h
    }

    this._moveSelectorTo(this._saturationWidth * s, (1 - v) * this._hueHeight)
    this._moveHueTo((1 - this.hue) * this._hueHeight)

    this._updateHue()
    return this
  }

  /**
   * Set size of the color picker for a given width and height. Note that
   * a padding of 5px will be added if you chose to use the background option
   * of the constructor.
   * @param {Number} width
   * @param {Number} height
   * @return {ColorPicker} Returns itself for chaining purpose
   */
  public setSize(width: number, height: number): ColorPicker {
    this.width = width
    this.height = height
    this.$el.style.width = this.width + this._widthUnits
    this.$el.style.height = this.height + this._heightUnits

    this._saturationWidth = this.width - 25
    this.$saturation.style.width = this._saturationWidth + 'px'

    this._hueHeight = this.height
    this._maxHue = this._hueHeight - 2

    return this
  }

  /**
   * Set the background color of the picker. It also adds a 5px padding
   * for design purpose.
   * @param {String|Number} color hex color desired for background
   * @return {ColorPicker} Returns itself for chaining purpose
   */
  public setBackgroundColor(color: string | number): ColorPicker {
    this.backgroundColor.fromHex(color)
    this.$el.style.padding = '5px'
    this.$el.style.background = this.backgroundColor.hexString
    return this
  }

  /**
   * Removes background of the picker if previously set. It's no use
   * calling this method if you didn't set the background option on start
   * or if you didn't call setBackgroundColor previously.
   */
  public setNoBackground(): ColorPicker {
    this.$el.style.padding = '0px'
    this.$el.style.background = 'none'
    return this
  }

  /**
   * Registers callback to the update event of the picker.
   * picker inherits from [component/emitter](https://github.com/component/emitter)
   * so you could do the same thing by calling `colorPicker.on('update');`
   * @param  {Function} callback
   * @return {ColorPicker} Returns itself for chaining purpose
   */
  public onChange(callback: Function): ColorPicker {
    if (this._callbacks.indexOf(callback) < 0) {
      this._callbacks.push(callback)
      callback(this.getHexString())
    }
    return this
  }

  /**
   * Is true when mouse is down and user is currently choosing a color.
   */
  public get isChoosing(): boolean {
    return this._isChoosing
  }

  /* =============================================================================
    Color getters
  ============================================================================= */
  /**
   * Main color getter, will return a formatted color string depending on input
   * or a number depending on the last setColor call.
   * @return {Number|String}
   */
  public getColor(): number | string {
    if (this._inputIsNumber) {
      return this.getHexNumber()
    }
    return this.getHexString()
  }

  /**
   * Returns color as css hex string (ex: '#FF0000').
   * @return {String}
   */
  public getHexString(): string {
    return this.color.hexString.toUpperCase()
  }

  /**
   * Returns color as number (ex: 0xFF0000).
   * @return {Number}
   */
  public getHexNumber(): number {
    return this.color.hex
  }

  /**
   * Returns color as {r: 1, g: 0, b: 0} object.
   * @return {Object}
   */
  public getRGB(): RGBAColor {
    return this.color.rgb
  }

  /**
   * Returns color as {h: 100, s: 1, v: 1} object.
   * @return {Object}
   */
  public getHSV(): HSVAColor {
    return this.color.hsv
  }

  /**
   * Returns true if color is perceived as dark
   * @return {Boolean}
   */
  public isDark(): boolean {
    return this.color.isDark
  }

  /**
   * Returns true if color is perceived as light
   * @return {Boolean}
   */
  public isLight(): boolean {
    return this.color.isLight
  }

  /* =============================================================================
    Private methods
  ============================================================================= */
  private _moveSelectorTo(x: number, y: number): void {
    this.position.x = clamp(x, 0, this._saturationWidth)
    this.position.y = clamp(y, 0, this._hueHeight)

    this.$sbSelector.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
  }

  private _updateColorFromPosition(): void {
    this.color.fromHsv({
      h: this.hue,
      s: this.position.x / this._saturationWidth,
      v: 1 - this.position.y / this._hueHeight
    })
    this._updateColor()
  }

  private _moveHueTo(y: number): void {
    this._huePosition = clamp(y, 0, this._maxHue)
    this.$hSelector.style.transform = `translateY(${this._huePosition}px)`
  }

  private _updateHueFromPosition(): void {
    const hsvColor = this.getHSV()
    this.hue = 1 - this._huePosition / this._maxHue
    this.color.fromHsv({ h: this.hue, s: hsvColor.s, v: hsvColor.v })
    this._updateHue()
  }

  private _updateHue(): void {
    this.hueColor.fromHsv({ h: this.hue, s: 1, v: 1 })
    this.$saturation.style.background = `linear-gradient(to right, #fff, ${this.hueColor.hexString})`
    this._updateColor()
  }

  private _updateColor(): void {
    this.$sbSelector.style.background = this.getHexString()
    this.$sbSelector.style.borderColor = this.isDark() ? '#fff' : '#000'
    this._triggerChange()
  }

  private _triggerChange(): void {
    this._callbacks.forEach(callback => callback(this.getHexString()))
  }

  /* =============================================================================
    Events handlers
  ============================================================================= */
  private _onSaturationMouseDown = (e: MouseEvent | TouchEvent): void => {
    const sbOffset = this.$saturation.getBoundingClientRect()
    const { x, y } = getMousePosition(e)
    this._isChoosing = true
    this._moveSelectorTo(x - sbOffset.left, y - sbOffset.top)
    this._updateColorFromPosition()
    this._window.addEventListener('mouseup', this._onSaturationMouseUp)
    this._window.addEventListener('touchend', this._onSaturationMouseUp)
    this._window.addEventListener('mousemove', this._onSaturationMouseMove)
    this._window.addEventListener('touchmove', this._onSaturationMouseMove)
    e.preventDefault()
  }

  private _onSaturationMouseMove = (e: MouseEvent | TouchEvent): void => {
    const sbOffset = this.$saturation.getBoundingClientRect()
    const { x, y } = getMousePosition(e)
    this._moveSelectorTo(x - sbOffset.left, y - sbOffset.top)
    this._updateColorFromPosition()
  }

  private _onSaturationMouseUp = () => {
    this._isChoosing = false
    this._window.removeEventListener('mouseup', this._onSaturationMouseUp)
    this._window.removeEventListener('touchend', this._onSaturationMouseUp)
    this._window.removeEventListener('mousemove', this._onSaturationMouseMove)
    this._window.removeEventListener('touchmove', this._onSaturationMouseMove)
  }

  private _onHueMouseDown = (e: MouseEvent | TouchEvent): void => {
    const hOffset = this.$hue.getBoundingClientRect()
    const { y } = getMousePosition(e)
    this._isChoosing = true
    this._moveHueTo(y - hOffset.top)
    this._updateHueFromPosition()
    this._window.addEventListener('mouseup', this._onHueMouseUp)
    this._window.addEventListener('touchend', this._onHueMouseUp)
    this._window.addEventListener('mousemove', this._onHueMouseMove)
    this._window.addEventListener('touchmove', this._onHueMouseMove)
    e.preventDefault()
  }

  private _onHueMouseMove = e => {
    const hOffset = this.$hue.getBoundingClientRect()
    const { y } = getMousePosition(e)
    this._moveHueTo(y - hOffset.top)
    this._updateHueFromPosition()
  }

  private _onHueMouseUp = () => {
    this._isChoosing = false
    this._window.removeEventListener('mouseup', this._onHueMouseUp)
    this._window.removeEventListener('touchend', this._onHueMouseUp)
    this._window.removeEventListener('mousemove', this._onHueMouseMove)
    this._window.removeEventListener('touchmove', this._onHueMouseMove)
  }
}
