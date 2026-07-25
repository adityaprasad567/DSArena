import type { AlgoStep } from "../types";

export function* bubbleSort(input: number[]): Generator<AlgoStep> {
  const array = [...input];
  const n = array.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        description: `Comparing index ${j} (${array[j]}) and index ${j + 1} (${array[j + 1]})`,
      };
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield {
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `${array[j + 1]} > ${array[j]}, so swap indices ${j} and ${j + 1}`,
        };
      }
    }
    sorted.unshift(n - 1 - i);
    yield {
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `Index ${n - 1 - i} (${array[n - 1 - i]}) is now in its final position`,
    };
  }

  sorted.unshift(0);
  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: [...Array(n).keys()],
    description: "Array fully sorted",
  };
}
