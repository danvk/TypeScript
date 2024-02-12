//// [tests/cases/compiler/inferTypePredicateArrow.ts] ////

//// [inferTypePredicateArrow.ts]
// https://github.com/microsoft/TypeScript/issues/16069

const numsOrNull = [1, 2, 3, 4, null];
const filteredNums = numsOrNull.filter(x => !!x);

const evenSquaresInline: number[] =
    [1, 2, 3, 4]
        .map(x => x % 2 === 0 ? x * x : null)
        .filter(x => !!x);

// const isTruthy = (x: number | null) => { return !!x; };
const isTruthy = (x: number | null) => !!x;

const evenSquares: number[] =
[1, 2, 3, 4]
    .map(x => x % 2 === 0 ? x * x : null)
      .filter(isTruthy);

// Type guards can flow between functions
const myGuard = (o: string | undefined): o is string => !!o;
const mySecondGuard = (o: string | undefined) => myGuard(o);

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-1327449914
type MyObj = { data?: string };
type MyArray = { list?: MyObj[] }[];
const myArray: MyArray = [];

const result = myArray
  .map((arr) => arr.list)
  .filter((arr) => arr && arr.length)
  .map((arr) => arr
//              ^^^ Object is possibly 'undefined'.
    .filter((obj) => obj && obj.data)
    .map(obj => JSON.parse(obj.data))
//                         ^^^^^^^^ Type 'undefined' is not assignable to type 'string'.
  );

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-1335186481

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-1183547889
type Foo = {
  foo: string;
}
type Bar = Foo & {
  bar: string;
}

const list: (Foo | Bar)[] = [];
const resultBar = list.filter((value) => 'bar' in value);
// result type should be `Bar[]`

// https://github.com/microsoft/TypeScript/issues/38390#issuecomment-626019466
// Ryan's example:
const a = [1, "foo", 2, "bar"].filter(x => typeof x === "string");
// Currently legal
a.push(10);

// Defer to explicit type guards, even when they're incorrect.
function backwardsGuard(x: number|string): x is number {
  return typeof x === 'string';
}


//// [inferTypePredicateArrow.js]
// https://github.com/microsoft/TypeScript/issues/16069
var numsOrNull = [1, 2, 3, 4, null];
var filteredNums = numsOrNull.filter(function (x) { return !!x; });
var evenSquaresInline = [1, 2, 3, 4]
    .map(function (x) { return x % 2 === 0 ? x * x : null; })
    .filter(function (x) { return !!x; });
// const isTruthy = (x: number | null) => { return !!x; };
var isTruthy = function (x) { return !!x; };
var evenSquares = [1, 2, 3, 4]
    .map(function (x) { return x % 2 === 0 ? x * x : null; })
    .filter(isTruthy);
// Type guards can flow between functions
var myGuard = function (o) { return !!o; };
var mySecondGuard = function (o) { return myGuard(o); };
var myArray = [];
var result = myArray
    .map(function (arr) { return arr.list; })
    .filter(function (arr) { return arr && arr.length; })
    .map(function (arr) { return arr
    //              ^^^ Object is possibly 'undefined'.
    .filter(function (obj) { return obj && obj.data; })
    .map(function (obj) { return JSON.parse(obj.data); }); }
//                         ^^^^^^^^ Type 'undefined' is not assignable to type 'string'.
);
var list = [];
var resultBar = list.filter(function (value) { return 'bar' in value; });
// result type should be `Bar[]`
// https://github.com/microsoft/TypeScript/issues/38390#issuecomment-626019466
// Ryan's example:
var a = [1, "foo", 2, "bar"].filter(function (x) { return typeof x === "string"; });
// Currently legal
a.push(10);
// Defer to explicit type guards, even when they're incorrect.
function backwardsGuard(x) {
    return typeof x === 'string';
}
