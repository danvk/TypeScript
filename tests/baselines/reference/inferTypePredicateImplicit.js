//// [tests/cases/compiler/inferTypePredicateImplicit.ts] ////

//// [inferTypePredicateImplicit.ts]
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

function isNonNullExplicit(x: number | null) {
  const ok = x !== null;
  if (ok) {
    let t: number = x;
  }
  return ok;
}


//// [inferTypePredicateImplicit.js]
function isNonNull(x) {
    var ok = x !== null;
    return ok;
}
if (isNonNull(tNN)) {
    var t = tNN;
}
// Should not infer a type predicate for this function.
// true return => x is string, but false return !=> x is number
function flakyIsString(x) {
    return typeof x === 'string' && Math.random() > 0.5;
}
function isNonNullExplicit(x) {
    var ok = x !== null;
    if (ok) {
        var t = x;
    }
    return ok;
}
