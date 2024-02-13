//// [tests/cases/compiler/inferTypePredicateFocus.ts] ////

//// [inferTypePredicateFocus.ts]
const numsOrNull = [1, 2, 3, 4, null];
const filteredNums = numsOrNull.filter(x => !!x);


//// [inferTypePredicateFocus.js]
var numsOrNull = [1, 2, 3, 4, null];
var filteredNums = numsOrNull.filter(function (x) { return !!x; });
