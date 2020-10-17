import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { clamp, pad2, getMousePosition } from '../src/utils'

test('pad2', () => {
  assert.is(pad2('0'), '00')
  assert.is(pad2('F'), '0F')
  assert.is(pad2('4D'), '4D')
  assert.is(pad2('f0'), 'f0')
})

test('clamp', () => {
  assert.is(clamp(0, 1, 2), 1)
  assert.is(clamp(1, 0, 2), 1)
  assert.is(clamp(2, 0, 3), 2)
  assert.is(clamp(2, -1, 1), 1)
  assert.is(clamp(-2, -1, 1), -1)
  assert.is(clamp(-0.5, -1, 1), -0.5)
})

test('getMousePosition', () => {
  const e1 = new window.MouseEvent('mousedown', {
    clientX: 10,
    clientY: 10
  })
  const e2 = new window.MouseEvent('mousemove', {
    clientX: 10,
    clientY: 10
  })
  // @ts-ignore
  const e3 = new window.TouchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] })
  assert.equal(getMousePosition(e1), { x: 10, y: 10 })
  assert.equal(getMousePosition(e2), { x: 10, y: 10 })
  assert.equal(getMousePosition(e3), { x: 10, y: 10 })
})

test.run()
