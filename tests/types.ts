import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { isString, isNumber } from '../src/types'

test('isString', () => {
  assert.ok(isString('0'))
  assert.ok(isString('foo'))
  assert.not(isString(1))
  assert.not(isString(0xFFFFFF))
  assert.not(isString(NaN))
  assert.not(isString(['sdfsdf']))
  assert.not(isString(() => {}))
  assert.not(isString({ foo: '4' }))
})

test('isNumber', () => {
  assert.not(isNumber('0'))
  assert.not(isNumber('foo'))
  assert.ok(isNumber(1))
  assert.ok(isNumber(0xFFFFFF))
  assert.not(isNumber(NaN))
  assert.not(isNumber(['sdfsdf']))
  assert.not(isNumber(() => {}))
  assert.not(isNumber({ foo: '4' }))
})

test.run()
