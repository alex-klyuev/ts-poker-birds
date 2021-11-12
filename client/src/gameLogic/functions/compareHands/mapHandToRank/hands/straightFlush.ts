import { HandToRankMap } from '../../../../types';

// Ranking system:
// [8, high-card, 0, ... 0]
// Since straights are a series of connected numbers, we only need to check the highest
// value in a straight to find a winner between 2 or more straights

// Sheeeeesh
export const straightFlush: HandToRankMap = (hand) => {
  // check for flush; if not, function is broken immediately
  for (let i = 1; i <= 4; i += 1) {
    if (hand[i].suit !== hand[0].suit) {
      return null;
    }
  }

  // check for wheel straight (A -> 5)
  let wheelCounter = 0;
  if (hand[0].num === 14) {
    for (let i = 1; i <= 4; i += 1) {
      if (hand[i].num === 6 - i) {
        wheelCounter += 1;
      }
    }
  }

  // if it's a wheel, return the rank
  if (wheelCounter === 4) {
    // 5 is the high card in a wheel
    return [8, 5, 0, 0, 0, 0];
  }

  // check for remaining straights
  for (let i = 1; i <= 4; i++) {
    if (hand[i].num !== hand[0].num - i) {
      return null;
    }
  }

  // return SF with high card
  return [8, hand[0].num, 0, 0, 0, 0];
};
