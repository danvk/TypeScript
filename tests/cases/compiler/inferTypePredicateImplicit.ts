// @strictNullChecks: true
function isNonNull(x: number | null) {
  const ok = x !== null;
  return ok;
}

let check: boolean = isNonNull(12);
