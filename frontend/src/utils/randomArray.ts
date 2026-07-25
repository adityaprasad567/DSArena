export function randomArray(size = 10, max = 99): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}
