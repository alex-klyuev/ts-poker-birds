import { HandToRankMap } from '../../../../types';

// Ranking system:
// [5, high-card, 2nd-highest-card, ... , 5th-highest-card]

type FlushArray = [number, number, number, number, number];

export const flush: HandToRankMap = (hand) => {
  for (let i = 1; i <= 4; i++) {
    if (hand[i].suit !== hand[0].suit) {
      return null;
    }
  }

  // all 5 flush cards need to be ranked
  const flushArray = [];
  for (let i = 0; i < 5; i++) {
    flushArray.push(hand[i].num);
  }
  return [5, ...flushArray as FlushArray];
};
