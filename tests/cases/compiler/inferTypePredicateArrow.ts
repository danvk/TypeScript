// @strictNullChecks: true
// https://github.com/microsoft/TypeScript/issues/16069

const numsOrNull = [1, 2, 3, 4, null];
const filteredNums = numsOrNull.filter(x => !!x);
// const last = numsOrNull.find(x => !!x);

// const val = new Uint16Array().find(x => x === 0);

/*
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
*/
