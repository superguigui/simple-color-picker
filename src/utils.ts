export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export type Position = {
  x: number
  y: number
}

export function getMousePosition(e: MouseEvent | TouchEvent): Position {
  if (e.type.indexOf('touch') === 0) {
    const touch = (e as TouchEvent).touches[0]
    return { x: touch.clientX, y: touch.clientY }
  }
  const mouse = e as MouseEvent
  return { x: mouse.clientX, y: mouse.clientY }
}

export function pad2(c: string): string {
  return c.length == 1 ? '0' + c : '' + c
}