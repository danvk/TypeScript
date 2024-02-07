// @strictNullChecks: true
// https://github.com/microsoft/TypeScript/issues/16069

const isTruthy = (x: number | null) => !!x;

const evenSquares: number[] =
    [1, 2, 3, 4]
        .map(x => x % 2 === 0 ? x * x : null)
          .filter(isTruthy);
//        .filter(x => !!x);
