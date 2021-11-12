import { HandToRankMap } from '../../../../types';

// Ranking system:
// [4, high-card, 0, ... 0]
// Since straights are a series of connected numbers, we only need to check the highest
// value in a straight to find a winner between 2 or more straights

export const straight: HandToRankMap = (hand) => {
  // check for wheel (see straight flush for explanation)
  let wheelCounter = 0;
  if (hand[0].num === 14) {
    for (let i = 1; i <= 4; i++) {
      if (hand[i].num === 6 - i) {
        wheelCounter++;
      }
    }
  }
  if (wheelCounter === 4) {
    return [4, 5, 0, 0, 0, 0];
  }

  // check for remaining straights
  for (let i = 1; i <= 4; i++) {
    if (hand[i].num !== hand[0].num - i) {
      return null;
    }
  }
  return [4, hand[0].num, 0, 0, 0, 0];
};
