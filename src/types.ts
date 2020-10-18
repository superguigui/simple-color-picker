export function isString(str: any): boolean {
  return typeof str === 'string'
}

export function isNumber(num: any): boolean {
  return typeof num === 'number' && !isNaN(num)
}
