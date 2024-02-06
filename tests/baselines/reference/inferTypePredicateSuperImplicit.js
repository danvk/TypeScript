//// [tests/cases/compiler/inferTypePredicateSuperImplicit.ts] ////

//// [inferTypePredicateSuperImplicit.ts]
function isNonNull(x: number | null) {
  return x !== null;
}

declare let tNN: number | null;
if (isNonNull(tNN)) {
  let t: number = tNN;
}


//// [inferTypePredicateSuperImplicit.js]
function isNonNull(x) {
    return x !== null;
}
if (isNonNull(tNN)) {
    var t = tNN;
}
