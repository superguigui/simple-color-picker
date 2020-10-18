import { test } from 'uvu'
import * as assert from 'uvu/assert'

import {
  Color,
  hexNumberToRgb,
  rgbToHex,
  numberToHexString,
  hexStringToNumber,
  hsvToRgb,
  rgbToHsv
} from '../src/color'

/* ===============================================================================
  COLOR CONVERSIONS
=============================================================================== */
test('hexNumberToRgb', () => {
  const { r, g, b } = hexNumberToRgb(0xa47d50)
  assert.is(r, 164 / 255)
  assert.is(g, 125 / 255)
  assert.is(b, 80 / 255)
})

test('rgbToHex', () => {
  const hex = rgbToHex({ r: 164 / 255, g: 125 / 255, b: 80 / 255 })
  assert.is(hex, '#A47D50')
})

test('numberToHexString', () => {
  assert.is(numberToHexString(0xf42da0), '#F42DA0')
  assert.is(numberToHexString(0x00ff12), '#00FF12')
  assert.is(numberToHexString(0x0), '#000000')
  assert.is(numberToHexString(16), '#000010')
})

test('hexStringToNumber', () => {
  assert.is(hexStringToNumber('#f42da0'), 0xf42da0)
  assert.is(hexStringToNumber('#00ff12'), 0x00ff12)
  assert.is(hexStringToNumber('#000000'), 0x0)
  assert.is(hexStringToNumber('#000010'), 16)
})

test('rgbToHsv', () => {
  {
    let { h, s, v } = rgbToHsv({ r: 104 / 255, g: 202 / 255, b: 137 / 255 })
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    v = Math.round(v * 100)
    assert.equal({ h, s, v }, { h: 140, s: 49, v: 79 })
  }
  {
    let { h, s, v } = rgbToHsv({ r: 255 / 255, g: 100 / 255, b: 20 / 255 })
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    v = Math.round(v * 100)
    assert.equal({ h, s, v }, { h: 20, s: 92, v: 100 })
  }
  {
    let { h, s, v } = rgbToHsv({ r: 255 / 255, g: 20 / 255, b: 100 / 255 })
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    v = Math.round(v * 100)
    assert.equal({ h, s, v }, { h: 340, s: 92, v: 100 })
  }
})

test('hsvToRgb', () => {
  let { r, g, b } = hexNumberToRgb(0x408080)
  r = Math.round(r * 100) / 100
  g = Math.round(g * 100) / 100
  b = Math.round(b * 100) / 100
  const rgb = { r, g, b }
  assert.equal(hsvToRgb({ h: 180 / 360, s: 50 / 100, v: 50 / 100 }), rgb)
})

/* ===============================================================================
  COLOR OBJECT
=============================================================================== */
test('create Color with hex number', () => {
  const color = new Color(0xff0000)
  assert.is(color.rgb.r, 1)
  assert.is(color.rgb.g, 0)
  assert.is(color.rgb.b, 0)
  assert.is(color.hex, 0xff0000)
  assert.is(color.hexString, '#FF0000')
})

test('create Color with hex string', () => {
  const color = new Color('#00ff00')
  assert.is(color.rgb.r, 0)
  assert.is(color.rgb.g, 1)
  assert.is(color.rgb.b, 0)
  assert.is(color.hex, 0x00ff00)
  assert.is(color.hexString, '#00FF00')
})

test('modify Color with hex string', () => {
  const color = new Color('#00ff00')
  color.fromHex('#A3FF77')
  assert.is(color.rgb.r, 163 / 255)
  assert.is(color.rgb.g, 1)
  assert.is(color.rgb.b, 119 / 255)
  assert.is(color.hex, 0xa3ff77)
  assert.is(color.hexString, '#A3FF77')
})

test('modify Color with hex number', () => {
  const color = new Color('#012345')
  color.fromHex(0xa07d54)
  assert.is(color.rgb.r, 160 / 255)
  assert.is(color.rgb.g, 125 / 255)
  assert.is(color.rgb.b, 84 / 255)
  assert.is(color.hex, 0xa07d54)
  assert.is(color.hexString, '#A07D54')
})

test('modify Color with HSV', () => {
  const color = new Color('#012345')
  color.fromHsv({ h: 324 / 360, s: 43 / 100, v: 96 / 100 })
  assert.is(
    Math.round(color.rgb.r * 100) / 100,
    Math.round((245 / 256) * 100) / 100
  )
  assert.is(
    Math.round(color.rgb.g * 100) / 100,
    Math.round((140 / 256) * 100) / 100
  )
  assert.is(
    Math.round(color.rgb.b * 100) / 100,
    Math.round((203 / 256) * 100) / 100
  )
  assert.is(color.hex, 0xf58ccb)
  assert.is(color.hexString, '#F58CCB')
})

test('brightness', () => {
  const lightColor = new Color('#FFFFFF')
  const darkColor = new Color('#000000')
  assert.is(lightColor.brightness, 1)
  assert.is(darkColor.brightness, 0)
})

test('isDark / isLight', () => {
  const lightColor = new Color('#FFFFFF')
  const darkColor = new Color('#000000')
  
  assert.not(lightColor.isDark)
  assert.ok(lightColor.isLight)
  assert.ok(darkColor.isDark)
  assert.not(darkColor.isLight)
})

test.run()
