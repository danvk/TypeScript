// @strictNullChecks: true
function isNonNull(x: number | null) {
  const ok = x !== null;
  return ok;
}

declare let tNN: number | null;
if (isNonNull(tNN)) {
  let t: number = tNN;
}

// Should not infer a type predicate for this function.
// true return => x is string, but false return !=> x is number
function flakyIsString(x: string | number) {
  return typeof x === 'string' && Math.random() > 0.5;
}
