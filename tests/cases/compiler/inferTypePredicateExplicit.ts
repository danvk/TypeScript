// @strictNullChecks: true
function isNonNullExplicit(x: number | null) {
  const ok = x !== null;
  if (ok) {
    let t: number = x;
  }
  return ok;
}
