// @strictNullChecks: true
function irrelevantIsNumber(x: string | number) {
	x = Math.random() < 0.5 ? "string" : 123;
  return typeof x === 'string';
}
