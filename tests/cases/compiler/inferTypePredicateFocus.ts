// @strictNullChecks: true
function flakyIsString(x: string | number) {
  return typeof x === 'string' && Math.random() > 0.5;
}

function isString(x: string | number) {
  return typeof x === 'string';
}
