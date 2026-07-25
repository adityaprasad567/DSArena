import type { AlgoStep } from "../types";

export function* mergeSort(input: number[]): Generator<AlgoStep> {
  const array = [...input];
  const n = array.length;

  function* sort(lo: number, hi: number): Generator<AlgoStep> {
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo + hi) / 2);
    yield* sort(lo, mid);
    yield* sort(mid, hi);
    yield* merge(lo, mid, hi);
  }

  function* merge(lo: number, mid: number, hi: number): Generator<AlgoStep> {
    const left = array.slice(lo, mid);
    const right = array.slice(mid, hi);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      yield {
        array: [...array],
        comparing: [lo + i, mid + j],
        swapping: [],
        sorted: [],
        description: `Merging: comparing ${left[i]} and ${right[j]}`,
      };
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      yield {
        array: [...array],
        comparing: [],
        swapping: [k],
        sorted: [],
        description: `Placing ${array[k]} at index ${k}`,
      };
      k++;
    }
    while (i < left.length) {
      array[k] = left[i];
      yield { array: [...array], comparing: [], swapping: [k], sorted: [], description: `Copying remaining left value ${left[i]}` };
      i++; k++;
    }
    while (j < right.length) {
      array[k] = right[j];
      yield { array: [...array], comparing: [], swapping: [k], sorted: [], description: `Copying remaining right value ${right[j]}` };
      j++; k++;
    }
  }

  yield* sort(0, n);
  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...Array(n).keys()],
    description: "Array fully sorted",
  };
}
