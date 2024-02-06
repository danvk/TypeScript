// @strictNullChecks: true
function isNonNull(x: number | null) {
  const ok = x !== null;
  return ok;
}

declare let tNN: number | null;
if (isNonNull(tNN)) {
  let t: number = tNN;
}
