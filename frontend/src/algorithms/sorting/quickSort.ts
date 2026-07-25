import type { AlgoStep } from "../types";

export function* quickSort(input: number[]): Generator<AlgoStep> {
  const array = [...input];
  const n = array.length;
  const sorted = new Set<number>();

  function* partition(lo: number, hi: number): Generator<AlgoStep, number> {
    const pivot = array[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      yield {
        array: [...array],
        comparing: [j, hi],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing ${array[j]} against pivot ${pivot}`,
      };
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        yield {
          array: [...array],
          comparing: [],
          swapping: [i, j],
          sorted: [...sorted],
          description: `${array[j] === pivot ? array[i] : array[j]} < pivot, swap into position ${i}`,
        };
      }
    }
    [array[i + 1], array[hi]] = [array[hi], array[i + 1]];
    sorted.add(i + 1);
    yield {
      array: [...array],
      comparing: [],
      swapping: [i + 1, hi],
      sorted: [...sorted],
      description: `Pivot placed at its sorted position, index ${i + 1}`,
    };
    return i + 1;
  }

  function* sort(lo: number, hi: number): Generator<AlgoStep> {
    if (lo >= hi) {
      if (lo === hi) sorted.add(lo);
      return;
    }
    const p = yield* partition(lo, hi);
    yield* sort(lo, p - 1);
    yield* sort(p + 1, hi);
  }

  yield* sort(0, n - 1);
  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...Array(n).keys()],
    description: "Array fully sorted",
  };
}
