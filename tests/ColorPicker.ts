import { suite, test } from 'uvu'
import * as assert from 'uvu/assert'
import browserEnv from 'browser-env'
import { ColorPicker } from '../src/ColorPicker'

/* -------------------------------------------------------------------------------------
  INIT BROWSER ENV
------------------------------------------------------------------------------------- */
browserEnv(['window', 'document', 'navigator'])

const container = document.createElement('div')
container.className = 'container'
document.body.appendChild(container)

/* -------------------------------------------------------------------------------------
  CREATION / CONSTRUCTOR
------------------------------------------------------------------------------------- */
const createSuite = suite('Create')

createSuite('Create without any options', () => {
  const picker1 = new ColorPicker()
  const picker2 = new ColorPicker({})
  assert.instance(picker1, ColorPicker)
  assert.instance(picker2, ColorPicker)
  assert.ok(picker1)
  assert.is(picker1.$el.className, 'Scp')
  assert.ok(picker2)
  assert.is(picker2.$el.className, 'Scp')
})

createSuite('Create with el option', () => {
  const picker = new ColorPicker({ el: container })
  assert.instance(picker, ColorPicker)
  assert.is(picker.$el.parentElement, container)
})

createSuite('Create with background option', () => {
  const picker = new ColorPicker({ background: 0xff0000 })
  assert.instance(picker, ColorPicker)
  assert.is(picker.$el.style.background, 'rgb(255, 0, 0)')
})

createSuite('Create with widthUnits option', () => {
  const pickerPx = new ColorPicker({ widthUnits: 'px' })
  const pickerPercent = new ColorPicker({ widthUnits: '%' })
  assert.instance(pickerPx, ColorPicker)
  assert.instance(pickerPercent, ColorPicker)

  assert.is(pickerPx.$el.style.width, '175px')
  assert.is(pickerPercent.$el.style.width, '175%')
})

createSuite('Create with heightUnits option', () => {
  const pickerPx = new ColorPicker({ heightUnits: 'px' })
  const pickerPercent = new ColorPicker({ heightUnits: '%' })
  assert.instance(pickerPx, ColorPicker)
  assert.instance(pickerPercent, ColorPicker)

  assert.is(pickerPx.$el.style.height, '150px')
  assert.is(pickerPercent.$el.style.height, '150%')
})

createSuite('Create with widthUnits and heightUnits option', () => {
  const pickerPx = new ColorPicker({
    heightUnits: 'px',
    widthUnits: 'px'
  })
  const pickerPercent = new ColorPicker({
    heightUnits: '%',
    widthUnits: '%'
  })
  const pickerMix1 = new ColorPicker({
    widthUnits: 'px',
    heightUnits: '%'
  })
  const pickerMix2 = new ColorPicker({
    widthUnits: '%',
    heightUnits: 'px'
  })
  assert.instance(pickerPx, ColorPicker)
  assert.instance(pickerPercent, ColorPicker)
  assert.instance(pickerMix1, ColorPicker)
  assert.instance(pickerMix2, ColorPicker)

  assert.is(pickerPx.$el.style.width, '175px')
  assert.is(pickerPx.$el.style.height, '150px')

  assert.is(pickerPercent.$el.style.width, '175%')
  assert.is(pickerPercent.$el.style.height, '150%')

  assert.is(pickerMix1.$el.style.width, '175px')
  assert.is(pickerMix1.$el.style.height, '150%')

  assert.is(pickerMix2.$el.style.width, '175%')
  assert.is(pickerMix2.$el.style.height, '150px')
})

createSuite('Create with width and height option', () => {
  const pickerNothing = new ColorPicker()
  const pickerW = new ColorPicker({ width: 100 })
  const pickerH = new ColorPicker({ height: 100 })
  const pickerWH = new ColorPicker({ width: 100, height: 100 })
  assert.instance(pickerNothing, ColorPicker)
  assert.instance(pickerW, ColorPicker)
  assert.instance(pickerH, ColorPicker)
  assert.instance(pickerWH, ColorPicker)

  assert.is(pickerNothing.width, 175)
  assert.is(pickerNothing.height, 150)

  assert.is(pickerW.width, 100)
  assert.is(pickerW.height, 150)

  assert.is(pickerH.width, 175)
  assert.is(pickerH.height, 100)

  assert.is(pickerWH.width, 100)
  assert.is(pickerWH.height, 100)

  assert.is(pickerNothing.$el.style.width, '175px')
  assert.is(pickerNothing.$el.style.height, '150px')

  assert.is(pickerW.$el.style.width, '100px')
  assert.is(pickerW.$el.style.height, '150px')

  assert.is(pickerH.$el.style.width, '175px')
  assert.is(pickerH.$el.style.height, '100px')

  assert.is(pickerWH.$el.style.width, '100px')
  assert.is(pickerWH.$el.style.height, '100px')
})

createSuite('Create with color option', () => {
  const pickerNothing = new ColorPicker()
  const pickerN = new ColorPicker({ color: 0x00ff00 })
  const pickerS = new ColorPicker({ color: '#F0F00F' })
  const pickerNaN = new ColorPicker({ color: NaN })
  assert.instance(pickerNothing, ColorPicker)
  assert.instance(pickerN, ColorPicker)
  assert.instance(pickerS, ColorPicker)
  assert.instance(pickerNaN, ColorPicker)

  assert.is(pickerNothing.getHexString(), '#000000')
  assert.is(pickerN.getHexString(), '#00FF00')
  assert.is(pickerS.getHexString(), '#F0F00F')
  assert.is(pickerNaN.getHexString(), '#000000')
})

/* -------------------------------------------------------------------------------------
  METHODS / UTILS
------------------------------------------------------------------------------------- */
const methodSuite = suite('Methods')

methodSuite('setNoBackground()', () => {
  const picker = new ColorPicker()
  picker.setNoBackground()

  assert.is(picker.$el.style.background, 'none')
})

methodSuite('getColor()', () => {
  const pickerN = new ColorPicker({ color: 0xff0000 })
  const pickerS = new ColorPicker({ color: '#00FF00' })
  assert.is(pickerN.getColor(), 0xff0000)
  assert.is(pickerS.getColor(), '#00FF00')
})

methodSuite('getRGB()', () => {
  const picker = new ColorPicker({ color: 0xff0000 })
  assert.equal(picker.getRGB(), { r: 1, g: 0, b: 0, a: 1 })
})

methodSuite('getHSV()', () => {
  const picker = new ColorPicker({ color: 0xff0000 })
  assert.equal(picker.getHSV(), { h: 0, s: 1, v: 1, a: 1 })
})

methodSuite('isDark()', () => {
  const pickerDark = new ColorPicker({ color: 0x000000 })
  const pickerLight = new ColorPicker({ color: 0xffffff })
  assert.ok(pickerDark.isDark())
  assert.not(pickerLight.isDark())
})

methodSuite('isLight()', () => {
  const pickerDark = new ColorPicker({ color: 0x000000 })
  const pickerLight = new ColorPicker({ color: 0xffffff })
  assert.not(pickerDark.isLight())
  assert.ok(pickerLight.isLight())
})

methodSuite('remove()', () => {
  const noop = () => {}
  const picker = new ColorPicker()
  picker.onChange(noop)

  // @ts-ignore
  picker._triggerChange()
  // @ts-ignore
  assert.is(picker._callbacks.length, 1)

  picker.remove()

  // @ts-ignore
  picker._triggerChange()
  // @ts-ignore
  assert.is(picker._callbacks.length, 0)

  assert.not(picker.$el.parentNode)
})

methodSuite('appendTo()', () => {
  const container = document.createElement('div')
  const picker = new ColorPicker()
  picker.appendTo(container)

  const container2 = document.createElement('div')
  container2.setAttribute('class', 'toto')
  document.body.appendChild(container2)
  const picker2 = new ColorPicker()
  picker2.appendTo('.toto')

  assert.is(picker.$el.parentNode, container)
  assert.is(picker2.$el.parentNode, container2)

  picker2.remove()

  assert.is.not(picker2.$el.parentNode, container2)
})

methodSuite('onChange()', async () => {
  const picker = new ColorPicker()
  picker.onChange(() => {
    assert.ok(true)
  })
  // @ts-ignore
  picker._updateColor()
  // @ts-ignore
  picker._updateColorFromPosition()
  // @ts-ignore
  picker._updateHueFromPosition()
})

/* -------------------------------------------------------------------------------------
  UPDATE FROM UI
------------------------------------------------------------------------------------- */
const uiSuite = suite('UI')

uiSuite('_moveSelectorTo()', () => {
  const picker = new ColorPicker()

  // @ts-ignore
  picker._moveSelectorTo(2, 2)

  assert.is(picker.$sbSelector.style.transform, 'translate(2px, 2px)')

  // @ts-ignore
  picker._moveSelectorTo(picker._saturationWidth + 4, 2)

  // @ts-ignore
  assert.is(picker.$sbSelector.style.transform, `translate(${picker._saturationWidth}px, 2px)`)

  // @ts-ignore
  picker._moveSelectorTo(2, picker._hueHeight)

  // @ts-ignore
  assert.is(picker.$sbSelector.style.transform, `translate(2px, ${picker._hueHeight}px)`)
})

uiSuite('_updateColorFromPosition()', () => {
  const picker = new ColorPicker()
  const e1 = new window.MouseEvent('mousedown', { clientX: 10, clientY: 10 })
  
  assert.not(picker.isChoosing)
  
  // @ts-ignore
  picker._onSaturationMouseDown(e1)
  assert.ok(picker.isChoosing)
  
  // @ts-ignore
  picker._onSaturationMouseUp()
  assert.not(picker.isChoosing)

})

createSuite.run()
methodSuite.run()
uiSuite.run()
