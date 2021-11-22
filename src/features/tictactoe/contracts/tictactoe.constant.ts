/**
 * Board
 * ---------
 * | 0 1 2 |
 * | 3 4 5 |
 * | 6 7 8 |
 * ---------
 */
const wins = [
  [0, 1, 2], // 1st row
  [3, 4, 5], // 2nd row
  [6, 7, 8], // 3rd row
  [0, 3, 6], // 1st column
  [1, 4, 7], // 2nd column
  [2, 5, 8], // 3rd column
  [0, 4, 8], // 1st dialog
  [2, 4, 6], // 2nd dialog
];

const potentials = [
  [0, 1], [0, 2], [1, 2], // 1st row
  [3, 4], [3, 5], [4, 5], // 2nd row
  [6, 7], [6, 8], [7, 8], // 3rd row
  [0, 3], [0, 6], [3, 6], // 1st column
  [1, 4], [1, 7], [4, 7], // 2nd column
  [2, 5], [2, 8], [5, 8], // 3rd column
  [0, 4], [0, 8], [4, 8], // 1st dialog
  [2, 4], [2, 6], [4, 6], // 2nd dialog
];

const orderOne = [
  4,
];

const orderTwo = [
  0, 2, 6, 7,
];

const orderThree = [
  1, 3, 5, 7,
];

export { wins, potentials, orderOne, orderTwo, orderThree };
