import type { AlgoStep } from "../types";

export function* binarySearch(input: number[], target: number): Generator<AlgoStep> {
  const array = [...input].sort((a, b) => a - b);
  let lo = 0, hi = array.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    yield {
      array,
      comparing: [mid],
      swapping: [],
      sorted: [],
      range: [lo, hi],
      description: `Checking midpoint index ${mid} (${array[mid]}) between ${lo} and ${hi}`,
    };
    if (array[mid] === target) {
      yield {
        array,
        comparing: [],
        swapping: [],
        sorted: [],
        found: mid,
        range: [lo, hi],
        description: `Found ${target} at index ${mid}`,
      };
      return;
    }
    if (array[mid] < target) {
      lo = mid + 1;
      yield { array, comparing: [], swapping: [], sorted: [], range: [lo, hi], description: `${array[mid]} < ${target}, search the right half` };
    } else {
      hi = mid - 1;
      yield { array, comparing: [], swapping: [], sorted: [], range: [lo, hi], description: `${array[mid]} > ${target}, search the left half` };
    }
  }
  yield { array, comparing: [], swapping: [], sorted: [], description: `${target} is not in the array` };
}
