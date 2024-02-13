//// [tests/cases/compiler/inferTypePredicateFocus.ts] ////

//// [inferTypePredicateFocus.ts]
function irrelevantIsNumber(x: string | number) {
	x = Math.random() < 0.5 ? "string" : 123;
  return typeof x === 'string';
}


//// [inferTypePredicateFocus.js]
function irrelevantIsNumber(x) {
    x = Math.random() < 0.5 ? "string" : 123;
    return typeof x === 'string';
}
