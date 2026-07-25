import type { AlgoStep } from "../types";

export function* linearSearch(input: number[], target: number): Generator<AlgoStep> {
  for (let i = 0; i < input.length; i++) {
    yield {
      array: input,
      comparing: [i],
      swapping: [],
      sorted: [],
      description: `Checking index ${i} (${input[i]}) against target ${target}`,
    };
    if (input[i] === target) {
      yield {
        array: input,
        comparing: [],
        swapping: [],
        sorted: [],
        found: i,
        description: `Found ${target} at index ${i}`,
      };
      return;
    }
  }
  yield {
    array: input,
    comparing: [],
    swapping: [],
    sorted: [],
    description: `${target} is not in the array`,
  };
}
