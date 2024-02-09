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
const result = list.filter((value) => 'bar' in value);
// result type should be `Bar[]`
