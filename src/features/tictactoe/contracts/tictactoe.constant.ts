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
const orderOne = [
  4,
];
const orderTwo = [
  0, 2, 6, 8,
];
const orderThree = [
  1, 3, 5, 7,
];

export { wins, orderOne, orderTwo, orderThree };
