// @strictNullChecks: true
function isNonNull(x: number | null) {
  return x !== null;
}

declare let tNN: number | null;
if (isNonNull(tNN)) {
  let t: number = tNN;
}
