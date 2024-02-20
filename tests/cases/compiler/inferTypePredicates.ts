// @strictNullChecks: true
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

const evenSquaresNonNull: number[] =
    [1, 2, 3, 4]
    .map(x => x % 2 === 0 ? x * x : null)
    .filter(x => x !== null);

function isNonNull(x: number | null) {
  return x !== null;
}

// factoring out a boolean works thanks to aliased discriminants
function isNonNullVar(x: number | null) {
  const ok = x !== null;
  return ok;
}

function isNonNullGeneric<T>(x: T) {
  return x !== null;
}

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

// Partition tests. The "false" case matters.
declare function partition<T, R extends T>(
  els: T[], pred: (x: T) => x is R
): [R[], Exclude<T, R>[]];

function isString(x: string | number) {
  return typeof x === 'string';
}

declare let strsOrNums: (string|number)[];
const [strs1, nums1] = partition(strsOrNums, isString); // nums1 should be number[]

function flakyIsString(x: string | number) {
  return typeof x === 'string' && Math.random() > 0.5;
}
const [strs2, nums2] = partition(strsOrNums, flakyIsString); // nums2 should be (string|number)[]

function isDate(x: object): x is Date {
  return x instanceof Date;
}
function flakyIsDate(x: object): x is Date {
  return x instanceof Date;
}

declare let maybeDates: object[];
const [dates1, objs1] = partition(maybeDates, isDate); // should be [Date[], object[]]
const [dates2, objs2] = partition(maybeDates, flakyIsDate); // should be [Date[], object[]]

// This should not infer a type guard since the value on which we do the refinement
// is not related to the original parameter.
function irrelevantIsNumber(x: string | number) {
	x = Math.random() < 0.5 ? "string" : 123;
  return typeof x === 'string';
}
function irrelevantIsNumberDestructuring(x: string | number) {
	[x] = [Math.random() < 0.5 ? "string" : 123];
  return typeof x === 'string';
}

// We shouldn't infer a type guard for either param because of the negative case.
function areBothNums(x: string|number, y: string|number) {
  return typeof x === 'number' && typeof y === 'number';
}

// It would be valid to infer a type guard for this function, but it would require some
// unification across the two return statements.
function doubleReturn(x: string|number) {
  if (typeof x === 'string') {
    return true;
  }
  return false;
}

function guardsOneButNotOthers(a: string|number, b: string|number, c: string|number) {
  return typeof b === 'string';
}

function dunderguard(__x: number | string) {
  return typeof __x  === 'string';
}
