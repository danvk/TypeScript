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


//// [inferTypePredicateImplicit.js]
function isNonNull(x) {
    var ok = x !== null;
    return ok;
}
if (isNonNull(tNN)) {
    var t = tNN;
}
