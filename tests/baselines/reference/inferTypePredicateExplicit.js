//// [tests/cases/compiler/inferTypePredicateExplicit.ts] ////

//// [inferTypePredicateExplicit.ts]
function isNonNullExplicit(x: number | null) {
  const ok = x !== null;
  if (ok) {
    let t: number = x;
  }
  return ok;
}


//// [inferTypePredicateExplicit.js]
function isNonNullExplicit(x) {
    var ok = x !== null;
    if (ok) {
        var t = x;
    }
    return ok;
}
